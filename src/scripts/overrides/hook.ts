/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */ // I should probably remove this
import { Callback, Message, Methods as ConsoleMethods, Storage } from "console-feed/lib/definitions/Console"
import Methods from "console-feed/lib/definitions/Methods"
import Parse from "console-feed/lib/Hook/parse"

function Hook(
	console: Console,
	callback: Callback
) {
  const TargetConsole = console as any
  const Storage: Storage = {
    pointers: {},
    src: {
      npm: 'https://npmjs.com/package/console-feed',
      github: 'https://github.com/samdenty/console-feed',
    },
  }

  for (const method of Methods) {
    const NativeMethod = TargetConsole[method]
    TargetConsole[method] = function () {
      NativeMethod.apply(this, arguments)
      const args = structuredClone([].slice.call(arguments))
      setTimeout(() => {
        const parsed = Parse(method as ConsoleMethods, args)
        if (parsed) {
          const encoded: Message = parsed as Message
          callback(encoded, parsed)
        }
      })
    }
    Storage.pointers[method] = NativeMethod
  }

  TargetConsole.feed = Storage

  return TargetConsole
}
export default Hook