const { withAppBuildGradle } = require("@expo/config-plugins");

const resolveAppGradleString = (options) => {
  // For React Native 0.71+, use "jetified-react-android" instead of "jetified-react-native"
  const rnJetifierName = options?.android?.legacyJetifier ? "jetified-react-native" : "jetified-react-android";

  const gradleString = `
// VLC Media Player - Fix libc++_shared.so conflict
tasks.whenTaskAdded((tas -> {
    // when task is 'mergeLocalDebugNativeLibs' or 'mergeLocalReleaseNativeLibs'
    if (tas.name.contains("merge") && tas.name.contains("NativeLibs")) {
        tasks.named(tas.name) {it
            doFirst {
                java.nio.file.Path notNeededDirectory = it.externalLibNativeLibs
                        .getFiles()
                        .stream()
                        .filter(file -> file.toString().contains("${rnJetifierName}"))
                        .findAny()
                        .orElse(null)
                        .toPath();
                java.nio.file.Files.walk(notNeededDirectory).forEach(file -> {
                    if (file.toString().contains("libc++_shared.so")) {
                        java.nio.file.Files.delete(file);
                    }
                });
            }
        }
    }
}))
`;

  return gradleString;
};

const withVlcMediaPlayer = (config, options) => {
  if (!options || !options.android) {
    return config;
  }

  return withAppBuildGradle(config, (config) => {
    const contents = config.modResults.contents;
    const gradleCode = resolveAppGradleString(options);

    // Use modern autolinking pattern as anchor
    const anchorPattern = /autolinkLibrariesWithApp\(\)/i;

    if (!anchorPattern.test(contents)) {
      console.warn("[VLC Plugin] Could not find autolinkLibrariesWithApp() in build.gradle");
      return config;
    }

    // Check if already added
    if (contents.includes("VLC Media Player - Fix libc++_shared.so conflict")) {
      return config;
    }

    // Insert after autolinkLibrariesWithApp()
    config.modResults.contents = contents.replace(
      anchorPattern,
      (match) => match + gradleCode
    );

    return config;
  });
};

module.exports = withVlcMediaPlayer;
