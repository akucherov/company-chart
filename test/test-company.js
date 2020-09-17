let expect = require('chai').expect;
let Company = require("../src/company");

describe('A new company test', function() {
    let company = new Company().options({});

    it('Initial company size should be zero', function(done){
        expect(company.size()).to.equal(0);
        done();
    });
});

describe('A new company with a founder', function() {
    let company = new Company().options({});
    company.add(1,"Boss", undefined);

    it('Company size has been changed', function(done){
        expect(company.size()).to.equal(1);
        done();
    });

});

describe('A company with a new staff', function() {
    let company = new Company().options({});
    company.add(1,"Boss", undefined);
    company.add(2,"Manager 1", 1);
    company.add(3,"Manager 2", 1);
    company.add(4,"Manager 3", 1);

    it('A company of 4', function(done){
        expect(company.size()).to.equal(4);
        done();
    });
});

describe('Employees ID is a number', function() {
    let company = new Company().options({});
    
    it('Wrong ID exception', function(done){
        expect(_ => company.add("A","Test", undefined)).to.throw();
        expect(_ => company.add("A","Test", 1)).to.throw();
        expect(_ => company.add("A","Test", "B")).to.throw();
        expect(_ => company.add(undefined,"Test", 1)).to.throw();
        expect(_ => company.add(undefined,"Test", NaN)).to.throw();
        expect(_ => company.add(NaN,"Test", 1)).to.throw();
        expect(_ => company.add(1,"Test", NaN)).to.throw();
        done();
    });
});

describe('A company staff has been updated', function() {
    let company = new Company().options({});
    company.add(1,"Boss", undefined);
    company.add(2,"Manager 1", 1);
    company.add(3,"Manager 2", 1);
    company.add(4,"Manager 3", 1);
    company.add(1,"New boss", undefined);

    it('Still a company of 4', function(done){
        expect(company.size()).to.equal(4);
        done();
    });
});

describe('Working with a company chart (a new boss)', function() {
    let company = new Company().options({});
    company.add(1,"Boss", undefined);
    company.add(2,"Manager 1", 1);
    company.add(3,"Manager 2", 1);
    company.add(4,"Manager 3", 1);
    company.add(1,"New boss", undefined);

    it('Size of chart', function(done){
        expect(company.chart().length).to.equal(4);
        done();
    });
});

describe('Working with a company chart (headless company)', function() {
    let company = new Company().options({});
    company.add(1,"Boss", undefined);
    company.add(2,"Manager 1", 1);
    company.add(3,"Manager 2", 1);
    company.add(4,"Manager 3", 1);
    company.add(1,"New boss", 4);

    it('Size of chart', function(done){
        expect(company.chart().length).to.equal(0);
        done();
    });
});

describe('Working with a company chart (rotation)', function() {
    let company = new Company().options({});
    company.add(1,"Boss", undefined);
    company.add(2,"Manager 1", 1);
    company.add(3,"Manager 2", 1);
    company.add(4,"Manager 3", 1);
    company.add(1,"New boss", 4);
    company.add(4,"Manager 3", undefined);

    it('Size of chart', function(done){
        expect(company.chart().length).to.equal(4);
        done();
    });
});


