document.addEventListener("DOMContentLoaded", () => {
    const element = document.getElementById("typed-message");

    if (!element) {
        return;
    }

    const resolver = {
        resolve(options, callback) {
            const resolveString = options.resolveString;

            function randomCharacter(characters) {
                const index = Math.floor(Math.random() * characters.length);
                return characters[index];
            }

            function doRandomiserEffect(effectOptions, effectCallback) {
                const { characters, iterations, partialString, timeout } = effectOptions;

                window.setTimeout(() => {
                    if (iterations > 0) {
                        element.textContent =
                            partialString.slice(0, -1) + randomCharacter(characters);

                        doRandomiserEffect({
                            ...effectOptions,
                            iterations: iterations - 1
                        }, effectCallback);
                        return;
                    }

                    element.textContent = partialString;
                    effectCallback();
                }, timeout);
            }

            function doResolverEffect(offset) {
                if (offset > resolveString.length) {
                    callback();
                    return;
                }

                doRandomiserEffect({
                    ...options,
                    partialString: resolveString.substring(0, offset)
                }, () => doResolverEffect(offset + 1));
            }

            doResolverEffect(1);
        }
    };

    const options = {
        timeout: 7,
        iterations: 10,
        characters: "abcdefghijklmnopqrstuvwxyz#%&-+_?/\\=".split(""),
        resolveString: element.dataset.message
    };

    // This callback runs after every character has resolved to the final text.
    resolver.resolve(options, () => {
        element.classList.add("typing-complete");
    });
});
