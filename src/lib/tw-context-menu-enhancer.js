/**
 * Enhances the ScratchBlocks right-click context menu with icons.
 * The icons are injected at runtime by matching the (translated) menu item
 * label, so we don't need to patch the compiled scratch-blocks bundle.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

const ICONS = [
    {
        name: 'duplicate',
        match: [/duplicate/i, /复制/],
        svg: '<path d="M4 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm9 4h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-3"/>'
    },
    {
        name: 'comment',
        match: [/comment/i, /注释/, /コメント/, /댓글/],
        svg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'
    },
    {
        name: 'help',
        match: [/help/i, /帮助/, /aide/i, /hilfe/i, /ayuda/],
        svg: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>'
    },
    {
        name: 'undo',
        match: [/undo/i, /撤销/, /annuler/i, /rückgängig/i, /deshacer/i, /取り消し/, /실행 취소/],
        svg: '<path d="M3 7v6h6M3 13a9 9 0 1 1 3 7.7"/>'
    },
    {
        name: 'redo',
        match: [/redo/i, /重做/, /refaire/i, /wiederholen/i, /rehacer/i, /やり直し/, /다시 실행/],
        svg: '<path d="M21 7v6h-6M21 13a9 9 0 1 0-3 7.7"/>'
    },
    {
        name: 'cleanup',
        match: [/clean up/i, /整理/, /nettoyer/i, /aufräumen/i, /ordenar/],
        svg: '<path d="M3 21V8M3 21h18M3 21H1M7 8v13M7 8l6-6 4 4-6 6h-4z"/>'
    },
    {
        name: 'collapse',
        match: [/collapse all/i, /折叠全部/, /plier tout/i, /alle einklappen/i, /contraer todo/i],
        svg: '<path d="M4 6h16M4 12h16M4 18h10"/>'
    },
    {
        name: 'expand',
        match: [/expand all/i, /展开全部/, /déplier tout/i, /alle aufklappen/i, /expandir todo/i],
        svg: '<path d="M4 6h16M4 12h16M12 18h8"/>'
    },
    {
        name: 'delete',
        match: [/delete/i, /删除/, /supprimer/i, /löschen/i, /eliminar/i, /削除/, /삭제/],
        svg: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6"/>'
    }
];

const findIcon = text => {
    for (const icon of ICONS) {
        if (icon.match.some(re => re.test(text))) {
            return icon.svg;
        }
    }
    return null;
};

const createIconEl = svgInner => {
    const div = document.createElement('div');
    div.className = 'tw-context-icon';
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('color', '#52525b');
    svg.innerHTML = svgInner;
    div.appendChild(svg);
    return div;
};

const enhanceMenu = menuEl => {
    const items = menuEl.querySelectorAll('.goog-menuitem');
    items.forEach(item => {
        if (item.querySelector('.tw-context-icon')) {
            return;
        }
        const content = item.querySelector('.goog-menuitem-content');
        const label = content ? content.textContent : item.textContent;
        const svgInner = findIcon(label);
        if (svgInner) {
            item.appendChild(createIconEl(svgInner));
        }
    });
};

const installContextMenuEnhancer = () => {
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== Node.ELEMENT_NODE) {
                    continue;
                }
                if (node.classList && node.classList.contains('goog-menu')) {
                    enhanceMenu(node);
                }
            }
        }
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
};

export default installContextMenuEnhancer;
