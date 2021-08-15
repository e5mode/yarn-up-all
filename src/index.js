module.exports = {
  name: 'yarn-up-all-plugin',
  factory: (require) => {
    const { Configuration, Project } = require('@yarnpkg/core');
    const { Cli, Command, Option } = require('clipanion');
    const Essentials = require('@yarnpkg/plugin-essentials');
    const typanion = require('typanion');

    /**
    * Resolve the name of a package
    * @param scope The scope of the descriptor
    * @param name The name of the descriptor
    * @returns {string|*} The full package name
    */
    const resolveFullPackageName = (scope, name) => (scope ? `@${scope}/${name}` : name);

    /**
    * Get the descriptor
    * @param dependencies The dependencies
    * @param exclude The list of full package names that should be excluded
    * @returns {*[]} The descriptors
    */
    const getDescriptors = (dependencies, exclude) => {
      const descriptions = [...dependencies.values()];
      if (exclude) {
        return descriptions
          .filter((descriptor) => {
            const data = resolveFullPackageName(descriptor[1].scope, descriptor[1].name);
            return !exclude.includes(data);
          });
      }
      return descriptions;
    };

    class UpAllCommand extends Command {
      constructor() {
        super();
        this.exclude = Option.String('-e,--exclude', { validator: typanion.isString() });
      }

      /**
       * Execute the command
       * @returns {Promise<void>}
       */
      async execute() {
        if (!Essentials.default.commands) {
          throw new Error('Yarn commands are not available!');
        }

        const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
        const { workspace } = await Project.find(configuration, this.context.cwd);

        const dependencies = [
          ...workspace.manifest.dependencies,
          ...workspace.manifest.devDependencies,
        ];

        const descriptors = getDescriptors(dependencies, this.exclude ? this.exclude.split(' ') : null);
        const packageNames = descriptors.map((e) => resolveFullPackageName(e[1].scope, e[1].name));

        const cli = Cli.from(Essentials.default.commands);
        return cli.runExit(['up', ...packageNames], this.context);
      }
    }

    UpAllCommand.paths = [['up-all']];
    UpAllCommand.usage = {
      category: 'Utilities',
      description: 'Yarn 2 plugin that will upgrade all dependencies to their latest version with one simple command',
      details: 'This command will upgrade all dependencies to their latest version. You can exclude certain dependencies from being upgraded by using the `-e,--exclude` option.',
      examples: [
        [
          'Upgrade all dependencies',
          'yarn up-all',
        ],
        [
          'Upgrade all dependencies but exclude a single dependency',
          'yarn up-all --exclude package',
        ],
        [
          'Upgrade all dependencies but exclude a single dependency',
          'yarn up-all -e package',
        ],
        [
          'Upgrade all dependencies but exclude multiple dependencies',
          'yarn up-all --exclude "package1 package2"',
        ]],
    };

    return {
      commands: [
        UpAllCommand,
      ],
    };
  },
};
