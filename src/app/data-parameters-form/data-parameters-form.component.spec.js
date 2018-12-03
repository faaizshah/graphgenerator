"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var data_parameters_form_component_1 = require("./data-parameters-form.component");
describe('DataParametersFormComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [data_parameters_form_component_1.DataParametersFormComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(data_parameters_form_component_1.DataParametersFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
