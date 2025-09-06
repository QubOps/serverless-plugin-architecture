class ArchitecturePlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.custom = serverless.service.custom || {};

    this.addConfigSchema();

    this.hooks = {
      "before:deploy:deploy": this.setArchitecture.bind(this),
    };
  }

  setArchitecture() {

    const cf = this.serverless.service.provider.compiledCloudFormationTemplate;
    cf.Resources = cf.Resources || {};

    const functions = this.serverless.service.functions || {};
    const architecture =
      this.serverless.service.provider.architecture ?? this.custom.architecture;

    Object.keys(functions).forEach((funcName) => {
      const funcArch = functions[funcName].architecture ?? architecture;

      // Stick with default behaviour if no explicit architecture is set
      if (!funcArch) {
        return;
      }

      const lambdaLogicalId = `${this.getNormalizedFunctionName(funcName)}LambdaFunction`;
      const lambdaObject = cf.Resources[lambdaLogicalId];

      if (!lambdaObject) {
        console.warn(
          `Lambda function ${lambdaLogicalId} not found in CloudFormation template`,
        );
        return;
      }

      if (!lambdaObject.Properties) {
        lambdaObject.Properties = {};
      }

      lambdaObject.Properties.Architectures = [funcArch];
    });
  }

  addConfigSchema() {
    if (!this.serverless.configSchemaHandler) {
      return;
    }

    this.serverless.configSchemaHandler.defineTopLevelProperty("architecture", {
      type: "string",
    });

    this.serverless.configSchemaHandler.defineFunctionProperties("aws", {
      properties: {
        architecture: {
          type: "string",
        },
      },
    });
  }

  getNormalizedFunctionName(functionName) {
    return functionName.charAt(0).toUpperCase() + functionName.slice(1);
  }
}

module.exports = ArchitecturePlugin;
