"use strict";

/* With current data, we could break this up by makes, it has pros and cons to do so
    but with such a small amount we can start here. */
const verifiedMakes = ['Ford','Chevrolet'];
const verifiedModels = ['Focus','Impala'];
const verifiedTrims = ['ST', 'SE'];

/* Base vehicle can become any type of vehicle down the line (van, bus, motorcycle, car, etc... ) */
class Vehicle {

    /**
     *
     * @returns Vehicle
     * @param {object} data Object should resemble what you see in data value of object.
     */
    constructor(data){
        this.data = {
            year : null,
            make : null,
            model : null,
            trim : null,
        };
        if(data){
            this.originalData = data;
            return this.validate().parse();
        }
        return this;
    }

    /**
     *
     * @returns Vehicle
     * @description  Modify strings to be nulls or other variants.
     */
    validate(){
        // check for blanks or if model contains trim.
        for(const opt in this.originalData){
            this.data[opt] = this.originalData[opt] === 'blank' ? null : this.originalData[opt];
        }
        return this;
    }


    /**
     *
     * @returns Vehicle
     * @description Sets the values that were passed in with the constructor.
     */
    parse(){
        this.setYear(this.data.year);
        this.setMake(this.convertToCased(this.data.make));
        this.setModel(this.convertToCased(this.data.model));
        if(this.data.trim){
            this.setTrim(this.data.trim.toUpperCase());
        }
        return this;
    }

    /**
     *
     * @param {String} value String to be converted to normal case.
     * @returns String
     * @description Takes a string and converts it to what we normally want to view.
     */
    convertToCased(value){
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    /**
     *
     * @param {String} make This should be a make of the vehicle.
     * @description Sets the make of the vehicle in the object.
     */
    setMake(make){
        /* If we try to set a make that starts with a real make, then we can pick that out. */
        if(make && !verifiedMakes.includes(make)){
            /* use this loop to bail out early, for each won't bail  */
            for(let i = 0; i < verifiedMakes.length; i++){
                const allowedMake = verifiedMakes[i];
                if(allowedMake.includes(make)){
                    this.data.make = allowedMake;
                    break;
                }
                this.data.make = this.originalData.make;
            }
        } else {
            this.data.make = make;
        }
    }

    /**
     *
     * @param {String} model This should be a model of vehicle.
     * @description Sets the model of the vehicle in the object and also looks to see if you passed in trim.
     */
    setModel(model){
        /* sometimes models contain trim items, let's clean those out if so. */
        const modelArray = String(model).toUpperCase().split(' ');
        if(modelArray.length){
            // find the items that are in the trim package and in the model name, set that to trim
            const foundTrim = modelArray.filter(element => verifiedTrims.includes(element));
            if(foundTrim.length){
                this.data.trim = foundTrim.pop();
            }
        }
        let newModel = [];
        modelArray.forEach((model)=>{
            if(model !== this.data.trim){
                newModel.push(model);
            }
        });
        model = this.convertToCased(newModel.join(' '));

        if(model && !verifiedMakes.includes(model)){
            /* use this loop to bail out early, for each won't bail  */
            for(let i = 0; i < verifiedModels.length; i++){
                const allowedModel = verifiedModels[i];
                if(allowedModel.includes(model)){
                    this.data.model = allowedModel;
                    break;
                }
                this.data.model = this.originalData.model;
            }
        }
        else {
            this.data.model = model;
        }
    }

    /**
     *
     * @param {String} trim String that denotes the trim of the vehicle.
     * @description Sets the trim in the vehicle object.
     */
    setTrim(trim){
        if(trim && verifiedTrims.includes(trim)){
           this.data.trim = trim;
        }
    }

    /**
     *
     * @param {String} year String that denotes the year of the vehicle.
     * @description Sets the year in the vehicle object and verifies the year is correct.
     */
    setYear(year){
         /* validate that the year will be picked up correctly  */
        /* We can break this out differently as we move across types of vehicles or specific brands. */
        this.data.year = String(year).length === 4 &&
            parseInt(year) >= 1900 &&
                parseInt(year) <= new Date().getFullYear() + 2 ? parseInt(year) : this.originalData.year;
    }

}
export default Vehicle;

