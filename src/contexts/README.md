# Global State Context

This directory contains the global state management for the application using React Context.

## GlobalStateContext

The `GlobalStateContext` provides a global state that stores the NIM (student ID) value from the `x-student-id` header.

### Features

- **NIM Storage**: Stores the student ID from the `x-student-id` header
- **Type Safety**: Full TypeScript support with proper typing
- **Undefined Handling**: If the header value doesn't exist, NIM is set to `undefined`
- **State Updates**: Provides a `setNim` function to update the NIM value

### Usage

#### 1. Access the Global State

```tsx
import { useGlobalState } from '../contexts/GlobalStateContext';

function MyComponent() {
  const { state, setNim } = useGlobalState();
  
  return (
    <div>
      <p>Current NIM: {state.nim || 'undefined'}</p>
      <button onClick={() => setNim('12345')}>
        Set NIM to 12345
      </button>
      <button onClick={() => setNim(undefined)}>
        Clear NIM
      </button>
    </div>
  );
}
```

#### 2. Read Only Access

If you only need to read the NIM value:

```tsx
function ReadOnlyComponent() {
  const { state } = useGlobalState();
  
  return (
    <div>
      <p>Student ID: {state.nim || 'Not available'}</p>
    </div>
  );
}
```

#### 3. Update NIM Value

```tsx
function UpdateComponent() {
  const { setNim } = useGlobalState();
  
  const handleNimUpdate = (newNim: string) => {
    setNim(newNim || undefined);
  };
  
  return (
    <input
      type="text"
      onChange={(e) => handleNimUpdate(e.target.value)}
      placeholder="Enter NIM"
    />
  );
}
```

### Setup

The `GlobalStateProvider` is already set up in both layout files:

- `src/app/(landing)/layout.tsx`
- `src/app/(app)/layout.tsx`

The provider automatically initializes with the NIM value from the `x-student-id` header. If the header doesn't exist, the NIM will be `undefined`.

### State Structure

```typescript
interface GlobalState {
  nim: string | undefined;
}

interface GlobalStateContextType {
  state: GlobalState;
  setNim: (nim: string | undefined) => void;
}
```

### Example Component

See `src/components/GlobalStateExample.tsx` for a complete example of how to use the global state.
