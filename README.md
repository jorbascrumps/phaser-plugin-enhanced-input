# Phaser Enhanced Input Plugin

An input plugin for [Phaser 3](https://phaser.io) inspired by Unreal Engine’s Enhanced Input system. Supports mapping keyboard input to named actions, with context-based grouping and optional lifecycle callbacks.

## Installation

```bash
npm install phaser-plugin-enhanced-input
```

## Usage

### Register the plugin
```ts
import {EnhancedInputPlugin} from 'phaser-plugin-enhanced-input';

new Phaser.Game({
  // ...
  plugins: {
    scene: [
      {
        key: 'enhancedInput',
        plugin: EnhancedInputPlugin,
        mapping: 'enhancedInput',
      }
    ]
  }
});
```

### Create a context
```ts
import {InputMappingContext} from 'phaser-plugin-enhanced-input';

const weaponContext = new InputMappingContext(this, {
    fire: {
        binding: Phaser.Input.Keyboard.KeyCodes.SPACE,
        pressed() {
            console.log('fire pressed');
        },
        held() {
            console.log('fire held');
        },
        released() {
            console.log('fire released');
        },
    },
});
this.enhancedInput.addMappingContext(weaponContext);
```

### Enable or disable input
```ts
this.enhancedInput.enableMappingContext(weaponContext);
// Or
weaponContext.enable();

// Later...
this.enhancedInput.disableMappingContext(weaponContext);
// Or
weaponContext.disable();
```

## API

### `InputMappingContext`

- `.enable()` – Attach all bindings and begin listening for events
- `.disable()` – Detach listeners without destroying state
- `.destroy()` – Clean up all resources
- Access bindings via dot notation: `context.fire.pressed(() => ...)`

