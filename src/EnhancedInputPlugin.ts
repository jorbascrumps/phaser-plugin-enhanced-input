import * as Phaser from 'phaser';

import InputMappingContext from './InputMappingContext';

export default class EnhancedInputPlugin extends Phaser.Plugins.BasePlugin {
    private contexts: InputMappingContext[] = []

    public addMappingContext(context: InputMappingContext, priority: number): this {
        if (this.contexts.includes(context)) {
            return this;
        }

        if (priority) {
        } else {
            this.contexts.push(context.enable());
        }

        return this;
    }

    public removeMappingContext(context: InputMappingContext): this {
        const index: number = this.contexts
            .findIndex((ctx: InputMappingContext): boolean => ctx === context);

        if (index !== -1) {
            this.contexts.splice(index, 1);

            context.disable();
        }

        return this;
    }

    public enableMappingContext(context: InputMappingContext): this {
        this.contexts
            .find((ctx: InputMappingContext): boolean => ctx === context)
            ?.enable();

        return this;
    }

    public disableMappingContext(context: InputMappingContext): this {
        this.contexts
            .find((ctx: InputMappingContext): boolean => ctx === context)
            ?.disable();

        return this;
    }

    public toggleMappingContext(context: InputMappingContext): this {
        if (context.isEnabled) {
            this.disableMappingContext(context);
        } else {
            this.enableMappingContext(context);
        }

        return this;
    }
}
