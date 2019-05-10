'use strict'

const Joi = require('@hapi/joi');

const configSchema = Joi.object().keys({
    localDir: Joi.string().required(),
    remoteDir: Joi.string().required(),
    selector: Joi.string().required(),
    containerName: Joi.string().allow(''),
    nameSpace: Joi.string().allow(''),
});

const ignoredPathSchema = Joi.object().keys({
  path: Joi.string().required(),
});

const schema = Joi.object().keys({
  configs: Joi.array().items(configSchema),
  ignoredPaths: Joi.array().items(ignoredPathSchema),
});

const validate = data => Joi.validate(data, schema);

module.exports = {
  validate,
}