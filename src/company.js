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
    Company.supervisors = new Map();

    const prepOptions = function (opt) {
        if (typeof opt === 'string') { // Pass json config filename
            Company.options = JSON.parse(file.readFileSync(opt));
        } else Company.options = opt;

        if (typeof Company.options.log === 'undefined') Company.options.log = default_options.log;
    }

    const makeLevel = function (level, id, chart) {
        if (Company.supervisors.has(id)) {
            let employees = Company.supervisors.get(id).employees;
            employees.forEach(e => {
                chart.push({level:level, name:e.name});
                chart = makeLevel(level+1, e.id, chart);
            })
        }
        return chart;
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
            if (Company.supervisors.has(supervisor)) {
                Company.supervisors.get(supervisor).employees.push({id:id, name: name})
            } else {
                Company.supervisors.set(supervisor, {employees: [{id: id, name: name}]})
            }
        },

        chart: function () {
            return makeLevel(0, undefined, []);
        },

        unsupervised: function () {
            let list = []
            for (let [id,e] of Company.employees) {
                if (!Company.employees.has(e.supervisor)) {
                    list.push({id:id, name:e.name, supervisor:e.supervisor})
                }
            }
            return list;
        }

        
    }
}

module.exports = company;