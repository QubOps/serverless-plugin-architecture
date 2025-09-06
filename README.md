# serverless-plugin-architecture

[![Serverless][ico-serverless]][link-serverless]
[![License][ico-license]][link-license]

## Summary

The ability to set the architecture of your Lambda functions in Serverless
Framework was introduced in [version
2.61.0](https://github.com/serverless/serverless/releases/tag/v2.61.0).

*This plugin is for projects that are stuck on an older version of Serverless
Framework but would like to take advantage of the arm64 architecture.*

## Installation

Install the plugin via your favourite npm client:

```bash
npm install --save-dev serverless-plugin-architecture
```

Enable the plugin in your `serverless.yml`:

```yaml
plugins:
  - serverless-plugin-architecture
```

Specify the architecture globally or at function level:

```yaml
custom:
  architecture: arm64
```

or

```yaml
functions:
  myFunction:
    handler: handler.myFunction
    architecture: arm64
```

It also works with the 2.61.0+ implementation of `provider.architecture` setting
but may result in a warning log during deployment on versions before schema
validation for plugins was introduced:

```yaml 
provider:
  name: aws
  architecture: arm64
```

## Notes

Just to reiterate, this plugin is not required if you are running Serverless
2.61.0 or later and can be removed once you upgrade.

[ico-license]: https://img.shields.io/badge/license-MIT-blue.svg
[ico-serverless]: https://s3-us-west-2.amazonaws.com/assets.blog.serverless.com/v3-badge.svg
[link-serverless]: https://www.serverless.com/
[link-license]: ./blob/main/LICENSE
