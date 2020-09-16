let company = function Company() {
    let Company = this;

    const file = require('fs');
    const default_options = {
        log: function (...args) {
            Array.prototype.slice.call(args).forEach(e => console.log(e));
        }
    }

    Company.options = default_options;
    Company.employees = new Map();

    const prepOptions = function (opt) {
        if (typeof opt === 'string') { // Pass json config filename
            Company.options = JSON.parse(file.readFileSync(opt));
        } else Company.options = opt;

        if (typeof Company.options.log === 'undefined') Company.options.log = default_options.log;
    }

    return {
        options: function (opt) {
            prepOptions(opt);
            return this;
        },

        size: function() {
            return Company.employees.size;
        },

        add: function (id, name, supervisor) {
            Company.employees.set(id, {name: name, supervisor: supervisor});
        }

        
    }
}

module.exports = company;