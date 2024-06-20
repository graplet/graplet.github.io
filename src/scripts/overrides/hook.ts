import { Callback, Message, Methods as ConsoleMethods, Storage } from "console-feed/lib/definitions/Console";
import Methods from "console-feed/lib/definitions/Methods";
import Parse from "console-feed/lib/Hook/parse";

function Hook(
	console: Console,
	callback: Callback
) {
  const TargetConsole = console as any;
  const Storage: Storage = {
    pointers: {},
    src: {
      npm: 'https://npmjs.com/package/console-feed',
      github: 'https://github.com/samdenty/console-feed',
    },
  };

  // Override console methods
  for (let method of Methods) {
    const NativeMethod = TargetConsole[method];

    // Override
    TargetConsole[method] = function () {
      // Pass back to native method
      NativeMethod.apply(this, arguments);

      // Parse arguments and send to transport
      const args = structuredClone([].slice.call(arguments));

      // setTimeout to prevent lag
      setTimeout(() => {
        const parsed = Parse(method as ConsoleMethods, args);
        if (parsed) {
          let encoded: Message = parsed as Message;
          callback(encoded, parsed);
        }
      })
    };

    // Store native methods
    Storage.pointers[method] = NativeMethod;
  }

  TargetConsole.feed = Storage;

  return TargetConsole;
}
export default Hook;