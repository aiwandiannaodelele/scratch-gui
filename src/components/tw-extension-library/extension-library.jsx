import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import classNames from 'classnames';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import styles from './extension-library.css';

const messages = defineMessages({
    search: {
        id: 'tw.extensionLibrary.search',
        defaultMessage: '搜索扩展',
        description: 'Search placeholder in extension library window'
    },
    all: {
        id: 'tw.extensionLibrary.all',
        defaultMessage: '全部',
        description: 'Label for all extensions tag'
    },
    noResults: {
        id: 'tw.extensionLibrary.noResults',
        defaultMessage: '没有找到扩展',
        description: 'Message when extension search has no results'
    }
});

const closeIcon = (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18M6 6l12 12" />
    </svg>
);

const searchIcon = (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
    </svg>
);

class ExtensionLibraryWindow extends React.Component {    constructor (props) {
        super(props);
        this.state = {
            filterQuery: '',
            selectedTag: 'all'
        };
    }
    handleFilterChange (e) {
        this.setState({
            filterQuery: e.target.value,
            selectedTag: 'all'
        });
    }
    handleTagClick (tag) {
        this.setState({
            filterQuery: '',
            selectedTag: tag.toLowerCase()
        });
    }
    getFilteredData () {
        const {data} = this.props;
        const {filterQuery, selectedTag} = this.state;
        return data.filter(item => {
            if (typeof item === 'string') {
                return false;
            }
            if (selectedTag !== 'all' && !(item.tags || []).map(t => t.toLowerCase()).includes(selectedTag)) {
                return false;
            }
            if (filterQuery) {
                const searchable = [
                    item.name,
                    item.description
                ].map(text => (typeof text === 'string' ? text : '')).join('\n').toLowerCase();
                if (!searchable.includes(filterQuery.toLowerCase())) {
                    return false;
                }
            }
            return true;
        });
    }
    handleItemClick (item) {
        if (item.href) {
            window.open(item.href);
            return;
        }
        if (!item.disabled) {
            this.props.onItemSelected(item);
        }
    }
    render () {
        const {data, tags, title, onRequestClose} = this.props;
        const {formatMessage} = this.props.intl;
        const filteredData = this.getFilteredData();
        const tagItems = [{tag: 'all', name: formatMessage(messages.all)}, ...tags];
        return ReactDOM.createPortal((
            <div className={styles.overlay}>
                <Draggable
                    bounds="parent"
                    cancel="input,button,.no-drag"
                    enableUserSelectHack={false}
                >
                    <div className={styles.window}>
                    <div className={styles.header}>
                        <span className={styles.headerTitle}>
                            {title}
                        </span>
                        <button
                            className={styles.closeButton}
                            onClick={onRequestClose}
                            aria-label="Close"
                        >
                            {closeIcon}
                        </button>
                    </div>
                    <div className={styles.searchRow}>
                        <div className={styles.searchWrapper}>
                            <span className={styles.searchIcon}>{searchIcon}</span>
                            <input
                                className={styles.searchInput}
                                type="text"
                                placeholder={formatMessage(messages.search)}
                                value={this.state.filterQuery}
                                onChange={e => this.handleFilterChange(e)}
                                spellCheck="false"
                            />
                        </div>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.sidebar}>
                            <div className={styles.segmentGroup}>
                                {tagItems.map(tag => {
                                    const tagId = tag.tag.toLowerCase();
                                    const count = data.filter(item => {
                                        if (typeof item === 'string') return false;
                                        if (tagId !== 'all' && !(item.tags || []).map(t => t.toLowerCase()).includes(tagId)) {
                                            return false;
                                        }
                                        return true;
                                    }).length;
                                    return (
                                        <button
                                            key={tagId}
                                            className={classNames(styles.segment, {
                                                [styles.segmentActive]: this.state.selectedTag === tagId
                                            })}
                                            onClick={() => this.handleTagClick(tag.tag)}
                                        >
                                            {tag.name}
                                            <span className={styles.segmentCount}>{count}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className={styles.content}>
                            {filteredData.length === 0 ? (
                                <div className={styles.empty}>
                                    {formatMessage(messages.noResults)}
                                </div>
                            ) : (
                                <div className={styles.grid}>
                                    {filteredData.map(item => (
                                        <div
                                            key={item.extensionId || item.name}
                                            className={classNames(styles.card, {
                                                [styles.cardFeatured]: item.featured,
                                                [styles.cardDisabled]: item.disabled
                                            })}
                                            onClick={() => this.handleItemClick(item)}
                                        >
                                            <div className={styles.cardIcon}>
                                                <img
                                                    loading="lazy"
                                                    src={item.rawURL}
                                                    draggable={false}
                                                    alt=""
                                                />
                                            </div>
                                            <div className={styles.cardName}>
                                                {item.name}
                                                <span className={styles.cardDescription}>
                                                    {item.description}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    </div>
                </Draggable>
            </div>
        ), document.body);
    }
}

ExtensionLibraryWindow.propTypes = {
    intl: intlShape,
    data: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.shape({
            name: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
            description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
            extensionId: PropTypes.string,
            disabled: PropTypes.bool,
            rawURL: PropTypes.string,
            tags: PropTypes.arrayOf(PropTypes.string)
        }),
        PropTypes.string
    ])),
    tags: PropTypes.arrayOf(PropTypes.shape({
        tag: PropTypes.string,
        name: PropTypes.node
    })),
    title: PropTypes.string,
    onItemSelected: PropTypes.func,
    onRequestClose: PropTypes.func
};

export default injectIntl(ExtensionLibraryWindow);
