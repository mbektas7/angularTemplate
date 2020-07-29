import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { FUSE_CONFIG } from '@mirapi/services/config.service';

@NgModule()
export class MirapiModule
{
    constructor(@Optional() @SkipSelf() parentModule: MirapiModule)
    {
        if ( parentModule )
        {
            throw new Error('MirapiModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders
    {
        return {
            ngModule : MirapiModule,
            providers: [
                {
                    provide : FUSE_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
