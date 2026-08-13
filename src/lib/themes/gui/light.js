const guiColors = {
    'color-scheme': 'light',

    'ui-primary': 'hsla(240, 20%, 99%, 1)', /* #FCFCFD 主背景 */
    'ui-secondary': 'hsla(240, 10%, 96%, 1)', /* #F4F4F5 面板背景 */
    'ui-tertiary': 'hsla(240, 10%, 91%, 1)', /* #E8E8EA 更深面板 */

    'ui-modal-overlay': 'hsla(240, 10%, 4%, 0.5)', /* 遮罩 */
    'ui-modal-background': 'hsla(0, 100%, 100%, 1)', /* #FFFFFF */
    'ui-modal-foreground': 'hsla(240, 10%, 8%, 1)', /* #1A1A1D */
    'ui-modal-header-background': 'hsla(240, 10%, 96%, 1)', /* #F4F4F5 */
    'ui-modal-header-foreground': 'hsla(240, 10%, 8%, 1)', /* #1A1A1D */

    'ui-white': 'hsla(0, 100%, 100%, 1)', /* #FFFFFF */
    'ui-white-dim': 'hsla(0, 100%, 100%, 0.75)', /* 25% transparent version of ui-white */
    'ui-white-transparent': 'hsla(0, 100%, 100%, 0.25)', /* 25% transparent version of ui-white */
    'ui-transparent': 'hsla(0, 100%, 100%, 0)', /* 25% transparent version of ui-white */

    'ui-black-transparent': 'hsla(240, 8%, 12%, 0.10)', /* 细边框 */

    'text-primary': 'hsla(240, 10%, 10%, 1)', /* #1B1B1F */
    'text-primary-transparent': 'hsla(240, 10%, 10%, 0.75)',

    'motion-primary': 'hsla(215, 100%, 65%, 1)', /* #4C97FF */
    'motion-primary-transparent': 'hsla(215, 100%, 65%, 0.9)', /* 90% transparent version of motion-primary */
    'motion-tertiary': 'hsla(215, 60%, 50%, 1)', /* #3373CC */

    'looks-secondary': 'hsla(260, 60%, 60%, 1)', /* #855CD6 */
    'looks-transparent': 'hsla(260, 60%, 60%, 0.35)', /* 35% transparent version of looks-tertiary */
    'looks-light-transparent': 'hsla(260, 60%, 60%, 0.15)', /* 15% transparent version of looks-tertiary */
    'looks-secondary-dark': 'hsla(260, 42%, 51%, 1)', /* #714EB6 */

    'red-primary': 'hsla(20, 100%, 55%, 1)', /* #FF661A */
    'red-tertiary': 'hsla(20, 100%, 45%, 1)', /* #E64D00 */

    'sound-primary': 'hsla(300, 53%, 60%, 1)', /* #CF63CF */
    'sound-tertiary': 'hsla(300, 48%, 50%, 1)', /* #BD42BD */

    'control-primary': 'hsla(38, 100%, 55%, 1)', /* #FFAB19 */

    'data-primary': 'hsla(30, 100%, 55%, 1)', /* #FF8C1A */

    'pen-primary': 'hsla(163, 85%, 40%, 1)', /* #0FBD8C */
    'pen-transparent': 'hsla(163, 85%, 40%, 0.25)', /* #0FBD8C */
    'pen-tertiary': 'hsla(163, 86%, 30%, 1)', /* #0B8E69 */

    'error-primary': 'hsla(30, 100%, 55%, 1)', /* #FF8C1A */
    'error-light': 'hsla(30, 100%, 70%, 1)', /* #FFB366 */
    'error-transparent': 'hsla(30, 100%, 55%, 0.25)', /* #FF8C1A */

    'extensions-primary': 'hsla(163, 85%, 40%, 1)', /* #0FBD8C */
    'extensions-tertiary': 'hsla(163, 85%, 30%, 1)', /* #0B8E69 */
    'extensions-transparent': 'hsla(163, 85%, 40%, 0.35)', /* 35% transparent version of extensions-primary */
    'extensions-light': 'hsla(163, 57%, 85%, 1)', /* opaque version of extensions-transparent, on white bg */

    'drop-highlight': 'hsla(215, 100%, 77%, 1)', /* lighter than motion-primary */

    'menu-bar-background': 'var(--looks-secondary)',
    'menu-bar-background-image': 'none',
    'menu-bar-foreground': '#ffffff',

    'assets-background': '#ffffff',

    'input-background': '#ffffff',

    'popover-background': '#ffffff',

    'shadow': 'hsla(240, 10%, 4%, 0.10)',

    'badge-background': 'hsla(240, 10%, 93%, 1)',
    'badge-border': 'hsla(240, 10%, 85%, 1)',

    'fullscreen-background': '#ffffff',
    'fullscreen-accent': '#f4f4f5',

    'page-background': '#ffffff',
    'page-foreground': '#18181b',

    'project-title-inactive': 'hsla(0, 100%, 100%, 0.5)',
    'project-title-hover': 'rgba(255, 255, 255, 0.9)',

    'link-color': '#2563eb',

    'filter-icon-black': 'none',
    'filter-icon-gray': 'grayscale(100%)',
    'filter-icon-white': 'none',

    'paint-ui-pane-border': 'var(--ui-black-transparent)',
    'paint-text-primary': 'var(--text-primary)',
    'paint-form-border': 'var(--ui-black-transparent)',
    'paint-looks-secondary': 'var(--looks-secondary)',
    'paint-looks-transparent': 'var(--looks-transparent)',
    'paint-input-background': 'var(--input-background)',
    'paint-popover-background': 'var(--popover-background)',
    'paint-filter-icon-gray': 'none'
};

const blockColors = {};

export {
    guiColors,
    blockColors
};
