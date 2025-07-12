import * as Phaser from 'phaser';

import InputMappingContext from './InputMappingContext';
import {InputCallback} from './types';

export default class KeyBinding {
    context: InputMappingContext;
    key: Phaser.Input.Keyboard.Key;
    private isAttached: boolean = false;
    private pressedFn?: InputCallback;
    private heldFn?: InputCallback;
    private releasedFn?: InputCallback;

    constructor(context: InputMappingContext, key: Phaser.Input.Keyboard.Key) {
        this.context = context;
        this.key = key;
    }

    public pressed(fn: InputCallback|undefined): this {
        this.pressedFn = fn;

        return this;
    }

    public held(fn: InputCallback|undefined): this {
        this.heldFn = fn;

        return this;
    }

    public released(fn: InputCallback|undefined): this {
        this.releasedFn = fn;

        return this;
    }

    public attach(): this {
        if (this.isAttached) {
            return this;
        }

        this.key.on(Phaser.Input.Keyboard.Events.DOWN, this.onKeyDown, this);

        this.key.on(Phaser.Input.Keyboard.Events.UP, this.onKeyUp, this);

        this.isAttached = true;

        return this;
    }

    public detach(): this {
        if (! this.isAttached) {
            return this;
        }

        this.key.off(Phaser.Input.Keyboard.Events.DOWN, this.onKeyDown, this);

        this.key.off(Phaser.Input.Keyboard.Events.UP, this.onKeyUp, this);

        this.isAttached = false;

        return this;
    }

    public destroy(): void {
        this.detach();
    }

    private onKeyDown(key: Phaser.Input.Keyboard.Key, event: KeyboardEvent): void {
        if (! this.context.isEnabled) {
            return;
        }

        if (Phaser.Input.Keyboard.JustDown(key)) {
            this.pressedFn?.call(this);
        } else {
            this.heldFn?.call(this);
        }
    }

    private onKeyUp(key: Phaser.Input.Keyboard.Key, event: KeyboardEvent): void {
        if (! this.context.isEnabled) {
            return;
        }

        this.releasedFn?.call(this);
    }
}
