'use strict';
const colors = require('colors/safe');
const Mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost:27017/orega'
const err = console.error;
const log = console.log;

module.exports = {
    connect: () => {
        Mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        Mongoose.connection.on('error', (e) => {
            err('Mongoose can not open connection');
            err(e);
            process.exit();
        });

        Mongoose.connection.on('connected', () => {
            log(colors.yellow('Connection DB ok', mongoUrl));
            // Mongoose.set('debug', true);
        });

        Mongoose.connection.on('disconnected', () => {
            err(colors.red('Connection DB lost'));

            setTimeout(() => {
                Mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
                err('DB reconnection');
            }, 15000);
        });
    }
};