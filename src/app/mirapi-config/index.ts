import { MirapiConfig } from '@mirapi/types';

/**
 * Default Mirapi Configuration
 *
 * You can edit these options to change the default options. All these options also can be
 * changed per component basis. See `app/main/authentication/login/login.component.ts`
 * constructor method to learn more about changing these options per component basis.
 */

export const mirapiConfig: MirapiConfig = {
    // Color themes can be defined in src/app/app.theme.scss
    colorTheme      : 'theme-default',
    customScrollbars: true,
    layout          : {
        style    : 'horizontal-layout-1',
        width    : 'fullwidth',
        navbar   : {
            primaryBackground  : 'mirapi-navy-700',
            secondaryBackground: 'mirapi-navy-900',
            folded             : false,
            hidden             : false,
            position           : 'top',
            variant            : 'horizontal-style-1'
        },
        toolbar  : {
            customBackgroundColor: false,
            background           : 'mirapi-white-500',
            hidden               : false,
            position             : 'above'
        },
        footer   : {
            customBackgroundColor: true,
            background           : 'mirapi-navy-900',
            hidden               : false,
            position             : 'below-fixed'
        },
        sidepanel: {
            hidden  : false,
            position: 'right'
        }
    }
};
