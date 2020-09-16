const Company = require("./company");
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const company = new Company().options({});

fs.createReadStream(path.resolve(__dirname, '../data', 'staff.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        let supervisor = row['Manager'];
        if (supervisor == '') company.add(Number(row['Id']), row['Name'], undefined)
        else company.add(Number(row['Id']), row['Name'], Number(supervisor))
    })
    .on('end', _ => {
        console.log(company.size());
        console.log(company.chart());
        console.log(company.unsupervised());
    })
