import * as Phaser from 'phaser';

import InputAction from './InputAction';
import type { InputMap } from './types';

export default class InputMappingContext {
    private enabled: boolean = false;
    private bindings: Map<string, InputAction> = new Map();
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, mapping: InputMap) {
        this.scene = scene;

        for (const [ name, { binding, pressed, held, released } ] of Object.entries(mapping)) {
            const key = this.scene.input.keyboard!
                .addKey(binding)
                .setEmitOnRepeat(true);

            const bindingObject: InputAction = new InputAction(this, key)
                .pressed(pressed)
                .held(held)
                .released(released);

            Object.defineProperty(this, name, {
                get: (): InputAction => bindingObject,
                enumerable: true,
                configurable: true,
            });

            this.bindings.set(name, bindingObject);
        }
    }

    public get isEnabled(): boolean {
        return this.enabled;
    }

    public enable(): this {
        this.enabled = true;

        this.bindings.forEach((binding: InputAction): InputAction => binding.attach());

        return this;
    }

    public disable(): this {
        this.bindings.forEach((binding: InputAction): InputAction => binding.detach());

        this.enabled = false;

        return this;
    }

    public destroy(): void {
        this.disable();

        this.bindings.forEach((binding: InputAction): void => binding.destroy());
        this.bindings.clear();
    }
}
