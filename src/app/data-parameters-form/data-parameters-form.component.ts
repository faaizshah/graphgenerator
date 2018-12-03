import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, NgForm } from '@angular/forms';
import { DataParameters } from '../data_parameters_model';
import * as FileSaver from 'file-saver';


@Component({
    selector: 'app-data-parameters-form',
    templateUrl: './data-parameters-form.component.html',
    styleUrls: ['./data-parameters-form.component.css']

})
export class DataParametersFormComponent implements OnInit {


    node_labels: string[] = [];

    node_property_keys: string[] = []; // adding this 

    relationship_types: string[] = []
    dataGenerated = '';
    toFile = 'Faaiz Shah';
    dataParameters = new DataParameters();
    isDataCopied: boolean;

    dataParametersForm: FormGroup;

    constructor(private fb: FormBuilder) { // <--- inject FormBuilder (dependency injection)
        this.createForm();

    


    }
   
    createForm() {

        /**
         * Define form control, with all its parameters.
         */
        this.dataParametersForm = new FormGroup({

            nodes_number: new FormControl(
                1,
                [
                    Validators.required,
                    Validators.min(1)]
            ),
            node_labels_radio: new FormControl(
                'option_number'
            ),
            node_labels_number: new FormControl(
                1,
                [
                    Validators.required,
                    Validators.min(1)]
            ),
            
            //------------------------------
            //------------------------------         
            node_property_radio: new FormControl(
                'option_number'
            ),

            node_property_number: new FormControl(
                1,
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(100)]
            ), 
            //-----------------------------
            //-----------------------------
            

            relationship_types_radio: new FormControl(
                'option_number'
            ),
            relationships_number: new FormControl(
                0,
                [
                    Validators.required,
                    Validators.min(0)]
            ),
            relationship_types_number: new FormControl(
                1,
                [
                    Validators.required,
                    Validators.min(1)]
            ),
            distribution_relationships_radio: new FormControl(
                'option_uniform'
            )
        });
    }

    ngOnInit() {
    }

    /**
     * Return the parameter 'nodes_number' enter in the dataParameters form
     * values available (by adding .value): number, >= 1
     *
     * @returns {AbstractControl | null}
     */
    get nodes_number() { return this.dataParametersForm.get('nodes_number'); }




    /**
     * Return the parameter 'node_labels_radio' enter in the dataParameters form
     * values available (by adding .value): string, 'option_number' or 'option_name'
     *
     * @returns {AbstractControl | null}
     */
    get node_labels_radio() { return this.dataParametersForm.get('node_labels_radio'); }

    /**
     * Return the parameter 'node_labels_number' enter in the dataParameters form
     * values available (by adding .value): number, >= 0
     *
     * @returns {AbstractControl | null}
     */
    get node_labels_number() { return this.dataParametersForm.get('node_labels_number'); }


    //-----------------------------
    //-----------------------------
    /**
     * Return the parameter 'nodes_property_keys_radio' enter in the dataParameters form
     * values available (by adding .value): string, 'option_number' or 'option_name'
     *
     * @returns {AbstractControl | null}
     */
    get node_property_radio() { return this.dataParametersForm.get('node_property_radio'); }

    
    /**
     * Return the parameter 'nodes_property_keys_number' enter in the dataParameters form
     * values available (by adding .value): number, >= 1
     *
     * @returns {AbstractControl | null}
     */
    get node_property_number() { return this.dataParametersForm.get('node_property_number'); }

    //-----------------------------
    //-----------------------------
     
    /**
     * Return the parameter 'relationship_types_radio' enter in the dataParameters form
     * values available (by adding .value): string, 'option_number' or 'option_name'
     *
     * @returns {AbstractControl | null}
     */
    get relationship_types_radio() { return this.dataParametersForm.get('relationship_types_radio'); }

    /**
     * Return the parameter 'relationships_number' enter in the dataParameters form
     * values available (by adding .value): number, >= 0
     *
     * @returns {AbstractControl | null}
     */
    get relationships_number() { return this.dataParametersForm.get('relationships_number'); }

    /**
     * Return the parameter 'relationship_types_number' enter in the dataParameters form
     * values available (by adding .value): number, >= 0
     *
     * @returns {AbstractControl | null}
     */
    get relationship_types_number() { return this.dataParametersForm.get('relationship_types_number'); }

    /**
     * Return the parameter 'relationship_types_number' enter in the dataParameters form
     * values available (by adding .value): number, >= 0
     *
     * @returns {AbstractControl | null}
     */
    get distribution_relationships() { return this.dataParametersForm.get('distribution_relationships_radio'); }

    /**
     * onSubmit
     *
     * send the form to the service dataGenerator
     */
    onSubmit() {
        this.dataParameters.nodes_number = this.nodes_number.value;
        
        

        this.dataParameters.relationships_number = this.relationships_number.value;
        this.dataParameters.distribution_relationships = this.distribution_relationships.value;

        if (this.node_labels_radio.value === 'option_name') {
            this.dataParameters.node_labels = this.node_labels; 

        } else {
            this.dataParameters.node_labels = this.getRandomWords(this.node_labels_number.value, 6);
        }

        //-----------------------------
        //-----------------------------
        if (this.node_property_radio.value === 'option_name') {
            this.dataParameters.node_property_keys = this.node_property_keys;
        }else{
            this.dataParameters.node_property_keys = this.getRandomWords(this.node_property_number.value, 6);
        }
        //-----------------------------
        //-----------------------------

        if (this.relationship_types_radio.value === 'option_name') {
            this.dataParameters.relationship_types = this.relationship_types;

        } else {
            this.dataParameters.relationship_types = this.getRandomWords(this.relationship_types_number.value, 6);
        }
        this.dataGenerated = this.generateData(this.dataParameters);

       



    }

     onClickMe() {
  //  console.log ('You are my hero!');
    let blob = new Blob([this.dataGenerated], { type: 'text/csv' });
    FileSaver.saveAs(blob, "cypherGenerated.txt");

    }



    getNodeProperties(nodeProperties): string[] {
        const words: string[] = [];

          for ( var j = 0; j < nodeProperties.length; j++) {
            words.push(nodeProperties[j]+':'+this.getRandomNumber(0, 100));
         }
      //   console.log(words);
         
        return words;
    }


   getNodePropertiesWithMissing(nodeProperties): string[] {
        const words: string[] = [];
      
      
        

      // for ( var j = 0; j < nodeProperties.length-(this.getRandomNumber(1,nodeProperties.length)); j++) {
    // for ( var j = (this.getRandomNumber(4,nodeProperties.length)); j >= 0; j--) {
      
      for ( var j = 0; j < (this.getRandomNumber(3,nodeProperties.length)); j++) {
            words.push(nodeProperties[j]+':'+this.getRandomNumber(1, 100));
         }

       // console.log(words);
        console.log(nodeProperties.length);
        console.log('words.length '+ words.length);
    //    if (words.length <= 0){
     //    words.push(nodeProperties[0]+':'+this.getRandomNumber(1, 100));
         //  for ( var j = 0; j < nodeProperties.length-(this.getRandomNumber(0,nodeProperties.length)); j++) {

          //      words.push(nodeProperties[j]+':'+this.getRandomNumber(1, 100));
       
         //   }
          // console.log('null array now = ' + words);
      //    this.getNodePropertiesWithMissing(nodeProperties[0]);
          
     //   } 

        return words;    
        
        
    }

    /**
     * generateData
     *
     * Generate the cypher query according to the DataParameters
     *
     * @param {DataParameters} params
     * @returns {string}
     */
    generateData(params: DataParameters): string {

        let cypher_query = '//CREATING NODES \n\n CREATE ';
        let label: string;
        var myMap = new Map();
        let property_key: string;
        let property_value: number;
        let chk_odd: number;

        let node_properties:string []= [];

    /*    for ( var j = 0; j < params.node_property_keys.length; j++) {
            node_properties.push(params.node_property_keys[j]+':'+this.getRandomNumber(0, 100));
         }
         console.log(node_properties);
    */
         
        // create the nodes
        for ( var i = 1; i < params.nodes_number; i++) {

            label = params.node_labels[this.getRandomNumber(0, params.node_labels.length - 1)];

           // property_key = params.node_property_keys[this.getRandomNumber(0, params.node_property_keys.length - 1)];

           // property_key = params.node_property_keys[i-1];

          //  property_value = this.getRandomNumber(1, 100);

          //  cypher_query += '(n' + i + ': ' + label + '{'+this.getNodeProperties(params.node_property_keys)+'}), ';

           // console.log(i);

            if(this.odd(i)){
              //  console.log(i+' is odd');
             // console.log(i+' is odd '+this.getNodePropertiesWithMissing(params.node_property_keys));
             cypher_query += '(n' + i + ': ' + label + '{'+this.getNodePropertiesWithMissing(params.node_property_keys)+'}),\n ';
            }else{
              // console.log(i+' is even '+this.getNodeProperties(params.node_property_keys));
              cypher_query += '(n' + i + ': ' + label + '{'+this.getNodeProperties(params.node_property_keys)+'}), \n';
            }

            
           
        }

       //  console.log(this.getNodeProperties(params.node_property_keys));


      //    console.log(params.node_property_keys);
      //    console.log(property_value);



        label = params.node_labels[this.getRandomNumber(0, params.node_labels.length - 1)];

      //  property_key = params.node_property_keys[this.getRandomNumber(0, params.node_property_keys.length - 1)];

        property_key = params.node_property_keys[0];  

        property_value = this.getRandomNumber(0, 100);

   

      //  cypher_query += '(n' + i + ': ' + label + '{'+property_key+':'+property_value+'}) \n\n';

         cypher_query += '(n' + i + ': ' + label + '{'+this.getNodeProperties(params.node_property_keys)+'}) \n\n ';




        
        if (params.distribution_relationships === 'option_uniform') {
            cypher_query += this.generateUniformRelationships(params.nodes_number, params.relationships_number, params.relationship_types);
        }
        else if (params.distribution_relationships === 'option_non_uniform') {
            cypher_query += this.generateNoneUniformRelationships(params.nodes_number, params.relationships_number, params.relationship_types);
        }

        return cypher_query;
    }

    /**
     * generateUniformRelationships
     *
     * Generate an uniform distribution of relationships. All the nodes will have approximately the same number of relationships.
     *
     * @param {number} nodes_number
     * @param {number} relationships_number
     * @param {string[]} r_types: the names list of relationship types.
     *
     * @returns {string}
     */
    generateUniformRelationships(nodes_number: number, relationships_number: number, r_types: string[]): string {


        var cypher_query = '//CREATING RELATIONSHIPS \n\n';
        var n1: number; // represent the first node of the relationship
        var n2: number; // represent the first node of the relationship
        var t = 0;      // represent the rang of the first type of relationships

        const tmax = r_types.length - 1; // represent the LAST rang of type of relationships
        const types_number = r_types.length;
        const ppcm = this.ppcm(nodes_number, types_number);

        // If there is only one node
        if (nodes_number == 1) {
            n1 = 1;
            n2 = 1;

            for (let i = 1; i <= relationships_number; i++) {

                cypher_query += 'CREATE (n' + n1 + ')-[r' + i + ':' + r_types[t] + ']->(n' + n2 + ')\n';

                if (t == tmax) { t = 0; }
                else { t += 1; }
            }
        }
        else {

            n1 = 1;
            n2 = 2;

            for (let i = 1; i <= relationships_number; i++) {
                cypher_query += 'CREATE (n' + n1 + ')-[r' + i + ':' + r_types[t] + ']->(n' + this.getRandomNumber(1, nodes_number) + ')\n';

                // Update n1
                if (n1 == nodes_number) { n1 = 1; }
                else { n1 += 1; }

                // Update type rang
                if (t == tmax) { t = 0; }
                else { t += 1; }

            }


            /*
            // Previous solution: more fairly but fare from the reality.
            for (let i = 1; i <= relationships_number; i++) {
              console.log('boucle ' + i);

              cypher_query += 'CREATE (n' + n1 + ')-[r' + i + ':' + r_types[t] + ']->(n' + n2 + ')\n';

              // Update n1
              if (n1 == nodes_number) { n1 = 1; }
              else { n1 += 1; }

              // Update n2
              if (n2 == nodes_number) {
                n2 = 1;
              }

              else if ( ( i % (nodes_number * types_number) == 0 ) ) {
                n2 = i / (nodes_number * types_number) + 2 ;
              }

              else { n2 += 1; }

              console.log('i / ppcm: ' + i / ppcm );
              console.log('i % ppcm: ' + i % ppcm );
              // Update type rang
              //if ( i % ppcm == 0 ) {  t = i / ppcm; console.log('if / t: ' + t); }
              if (t == tmax) { t = 0; console.log('else if / t: ' + t);}
              else { t += 1; console.log('else / t: ' + t);}
            }
            */

        }


        return cypher_query;
    }

    /**
     * generateNoneUniformRelationships
     *
     * Generate an non-uniform distribution of relationships. Some nodes will have more relationships than others.
     *
     * @param {number} nodes_number
     * @param {number} relationships_number
     * @param {string[]} r_types: the names list of relationship types.
     *
     * @returns {string}
     */
    generateNoneUniformRelationships(nodes_number: number, relationships_number: number, r_types: string[]): string {


        var cypher_query = '//CREATING RELATIONSHIPS \n\n';
        var n1: number; // represent the first node of the relationship
        var n2: number; // represent the first node of the relationship
        var t = 0;      // represent the rang of the first type of relationships
        const tmax = r_types.length - 1; // represent the LAST rang of type of relationships
        const types_number = r_types.length;

        // If there is only one node
        if (nodes_number == 1) {
            n1 = 1;
            n2 = 1;

            for (let i = 1; i <= relationships_number; i++) {

                cypher_query += 'CREATE (n' + n1 + ')-[r' + i + ':' + r_types[t] + ']->(n' + n2 + ')\n';

                if (t == tmax) { t = 0; }
                else { t += 1; }
            }
        }
        // Else
        else {

            n1 = 1;
            n2 = 2;
            for (let i = 1; i <= relationships_number; i++) {

                cypher_query += 'CREATE (n' + n1 + ')-[r' + i + ':' + r_types[t] + ']->(n' + n2 + ')\n';


                // if we already cross all the nodes with all the relationships for n1, we pass to the next node for the distribution of relationships
                if (n2 == nodes_number && t == tmax) {
                    n2 = 1;
                    t = 0;
                    n1 += 1;

                }

                else if (n2 == nodes_number) {
                    n2 = 1;
                    t += 1;
                    if (n1 == n2) { n2 += 1; }
                }
                else {
                    n2 += 1;
                    if (n1 == n2) { n2 += 1; }
                }
            }
        }

        return cypher_query;
    }


    /**
     * getRandomWords
     *
     * get a random word, its length will be between 4 and max_length.
     *
     * @param words_number {number}: the number of random words we want
     * @param max_length {number}: the max length of the word
     *
     * @return {string[]}: a list of random words
     */
    getRandomWords(words_number, max_length): string[] {

        const words: string[] = [];
        const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
        const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];

        for (let i = 0; i < words_number; i++) {

            let word = '';
            for (let j = 0; j < this.getRandomNumber(4, max_length); j++) {

                if (this.odd(j) == 1) {
                    word += vowels[this.getRandomNumber(0, vowels.length - 1)];
                } else {
                    word += consonants[this.getRandomNumber(0, vowels.length - 1)];
                }
            }
            words.push(word);
        }
        return words;
    }

    /**
     * odd
     *
     * return 1 if num is an odd number. else 0
     *
     * @param num
     *
     * @return number: 1 if num is an odd number, 0 else.
     */
    odd(num): number {
        return num % 2;
    }





    // This method was used in the previous version of the uniform distribution of relationships.
    /**
     * ppcm (plus petit commun multiplicateur)
     *
     * return the ppcm of n1 and n2
     *
     * @param n1, n2 : number
     *
     * @return number: the ppcm of n1 and n2
     */
    ppcm(n1, n2): number {

        const n = n1 * n2;

        while (n1 != n2) {
            if (n1 > n2) {
                n1 = n1 - n2;
            }
            else {
                n2 = n2 - n1;
            }
        }
        return n / n1;
    }

    /**
     * getRandomNumber
     *
     * get a random number (integer) between 0 and max (both included).
     *
     * @param min : the minimum number
     * @param max : the maximum number
     *
     * @return number: the random number
     */
    getRandomNumber(min, max): number {
       // console.log("before: "+min, max);
        min = Math.ceil(min);
        max = Math.floor(max);
      //  console.log("After: "+min, max);
      //  console.log("Returned : "+(Math.floor(Math.random() * (max - min + 1)) + min));


        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    /**
     * Submit method to add a new label name.
     *
     * @param {NgForm} labelForm
     */
    submitNodesLabel(labelForm: NgForm) {
        this.addNodesLabel(labelForm.form.value['nodes_labels']);
        labelForm.reset();
    }


    /**
     * Add the label to the node_labels array.
     *
     * @param {string} label
     */
    addNodesLabel(label: string) {
        this.node_labels.push(label);
    }

    //-----------------------------
    //-----------------------------
        /**
     * Submit method to add a new property name.
     *
     * @param {NgForm} propertyForm
     */
    submitNodeProperties(propertyForm: NgForm) {
        this.addNodeProperties(propertyForm.form.value['nodes_properties']);
        propertyForm.reset();
    }


    /**
     * Add the property to the node_properties array.
     *
     * @param {string} property
     */
    addNodeProperties(property: string) {
        this.node_property_keys.push(property);
    }

      /**
     * Delete the label from the node_labels array.
     *
     * @param {string} label
     */
    deleteNodeProperty(property: string) {
        const index: number = this.node_property_keys.indexOf(property);
        if (index !== -1) {
            this.node_property_keys.splice(index, 1);
        }
    }
    //-----------------------------
    //-----------------------------

    /**
     * Delete the label from the node_labels array.
     *
     * @param {string} label
     */
    deleteNodesLabel(label: string) {
        const index: number = this.node_labels.indexOf(label);
        if (index !== -1) {
            this.node_labels.splice(index, 1);
        }
    }

    /**
     * Submit method to add a new name for relationship type
     *
     * @param {NgForm} typeForm
     */
    submitRelationshipsType(typeForm: NgForm) {
        this.addRelationshipsType(typeForm.form.value['relationships_type']);
        typeForm.reset();
    }

    /**
     * Add the type to the relationship_types array
     *
     * @param {string} type
     */
    addRelationshipsType(type: string) {
        this.relationship_types.push(type);
    }

    /**
     * Delete the type from the relationship_types array
     *
     * @param {string} type
     */
    deleteRelationshipsType(type: string) {
        const index: number = this.relationship_types.indexOf(type);
        if (index !== -1) {
            this.relationship_types.splice(index, 1);
        }
    }
 
}
