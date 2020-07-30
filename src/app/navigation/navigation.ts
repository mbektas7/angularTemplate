import { MirapiNavigation } from '@mirapi/types';

export const navigation: MirapiNavigation[] = [
    {
        id       : 'applications',
        title    : 'Anasayfa',
        url      : '/dashboard',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'questions',
                title    : 'Questions',
                translate: 'NAV.QUESTIONS.TITLE',
                type     : 'item',
                icon     : 'question_answer',
                url      : '/questions',
                badge    : {
                    title    : '25',
                    translate: 'NAV.QUESTIONS.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            }
        ]
    },
    {
        id       : 'admin',
        title    : 'Yönetim',
        url      : '/admin',
        translate: 'NAV.ADMIN',
        type     : 'group',
        icon     : 'settings',
        children : [
            {
                id       : 'marka',
                title    : 'Markalar',
                type     : 'item',
                icon     : 'bookmark_border',
                url      : '/brands',
            },
            {
                id       : 'arac',
                title    : 'Araçlar',
                type     : 'item',
                icon     : 'bookmark_border',
                url      : '/cars',
            }
        ]
    }
    // ,
    // {
    //     id       : 'deneme',
    //     title    : 'Deneme',
    //     translate: 'NAV.SAMPLE.TITLE',
    //     type     : 'group',
    //     icon     : 'email',
    //     url      : '/deneme',
    //     badge    : {
    //         title    : '25',
    //         translate: 'NAV.SAMPLE.BADGE',
    //         bg       : '#F44336',
    //         fg       : '#FFFFFF'
    //     },
    //     children : [
    //         {
    //             id       : 'sample',
    //             title    : 'Sample',
    //             translate: 'NAV.SAMPLE.TITLE',
    //             type     : 'item',
    //             icon     : 'email',
    //             url      : '/sample',
    //             badge    : {
    //                 title    : '25',
    //                 translate: 'NAV.SAMPLE.BADGE',
    //                 bg       : '#F44336',
    //                 fg       : '#FFFFFF'
    //             }
    //         }
    //     ]
    // }
];
