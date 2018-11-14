<template>
  <div>
    <form id="formValidation"> <!-- @submit="formValidation" action="/" method="post" -->
      <div class="container">

        <div class="row">
          <div class="col-md-4 col-sm-3"/>
          <div class="col-md-8 col-sm-8">
            <p 
              v-if="errors.length" 
              class="text-danger">
              <b>Please correct the following error(s):</b>
              <ul>
                <li 
                  v-for="error in errors" 
                  :key="error" >{{ error }}</li>
              </ul>
            </p>
          </div>
        </div> 
        <!-- vee-validator and validate all on submit
      
          vuejs transition and transition group
       -->
        <div class="form-group row">
          <label 
            for="inputName" 
            class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input 
              id="inputName" 
              v-model="person.name" 
              type="text" 
              class="form-control" 
              placeholder="Name">
          </div> <!-- v-bind:class="{ 'form-control': nameValid,  'form-control is-invalid': !nameValid}" -->
        </div>      
        <div class="form-group row">
          <label 
            for="inputEmail" 
            class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input 
              id="inputEmail" 
              v-model="person.email" 
              type="email" 
              class="form-control" 
              placeholder="Email">
          </div> <!-- v-bind:class="{ 'form-control': emailValid,  'form-control is-invalid': !emailValid}" -->
        </div>
        <div class="form-group row">
          <label 
            for="inputPhone" 
            class="col-sm-2 col-form-label">Phone</label>
          <div class="col-sm-10">

            <vue-tel-input 
              v-model="person.phone"
              :preferred-countries="['us', 'gb', 'ua']"
              @onInput="onInput"/>
          <!-- <input type="text" class="form-control" id="inputPhone" placeholder="+12345671234" v-model="person.phone"> -->
          </div>
        </div>
        <fieldset class="form-group">
          <div class="row">
            <legend class="col-form-label col-sm-2 pt-0">Random radio buttons</legend>
            <div class="col-sm-10">
              <div class="form-check">
                <input 
                  id="gridRadios1" 
                  class="form-check-input" 
                  type="radio" 
                  name="gridRadios" 
                  value="option1" 
                  checked>
                <label 
                  class="form-check-label" 
                  for="gridRadios1">
                  First radio
                </label>
              </div>
              <div class="form-check">
                <input 
                  id="gridRadios2" 
                  class="form-check-input" 
                  type="radio" 
                  name="gridRadios" 
                  value="option2">
                <label 
                  class="form-check-label" 
                  for="gridRadios2">
                  Second radio
                </label>
              </div>
              <div class="form-check disabled">
                <input 
                  id="gridRadios3" 
                  class="form-check-input" 
                  type="radio" 
                  name="gridRadios" 
                  value="option3" 
                  disabled>
                <label 
                  class="form-check-label" 
                  for="gridRadios3">
                  Third disabled radio
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        <div class="form-group row">
          <div class="col-sm-2">Checkbox</div>
          <div class="col-sm-10">
            <div class="form-check">
              <input 
                id="gridCheck1" 
                class="form-check-input" 
                type="checkbox">
              <label 
                class="form-check-label" 
                for="gridCheck1">
                Example checkbox
              </label>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-5"/> <!-- End of column -->
          <div class="col-1">
            <button 
              type="button" 
              class="btn btn-primary" 
              @click="formValidation">Next</button>
          </div> <!-- End of column -->
        </div> <!-- End of row -->

      </div>
    </form>
  </div>
</template>

<script>
import { bus } from "../main";

export default {
  name: "State3",
  data() {
    return {
      errors: [],
      phoneValid: false,
      nameValid: false,
      emailValid: false,
      person: {
        name: "",
        email: "",
        phone: ""
      }
    };
  },

  methods: {
    // Emit the state to parent component
    formValidation: function(e) {
      // We could use Vue.js built in customer validator or below type of solution
      if (
        /[^a-zA-Z]/.test(this.person.name) &&
        this.validEmail(this.person.email) &&
        this.phoneValid
      ) {
        console.log("Everything is good");
        bus.$emit("next", "State4");
        bus.$emit("person", this.person);
        this.$router.push("/State4");
      } else {
        console.log(
          /[^a-zA-Z]/.test(this.person.name) +
            " " +
            this.validEmail(this.person.email) +
            " " +
            this.phoneValid
        );
      }

      this.errors = [];

      if (!/[^a-zA-Z]/.test(this.person.name)) {
        this.errors.push("Name is mandatory.");
        // this.nameValid = false;
      } /* else {
        this.nameValid = true;
      } */

      if (!this.person.email) {
        this.errors.push("Email is mandatory.");
        // this.emailValid = false;
      } else if (!this.validEmail(this.person.email)) {
        this.errors.push("Valid email required.");
        // this.emailValid = false;
      } /* else {
        this.emailValid = true;
      } */

      if (!this.phoneValid) {
        this.errors.push("Phone number is mandatory and must be valid.");
      } /* else {
        this.phoneValid = true;
      } */

      e.preventDefault();
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    onInput({ number, isValid, country }) {
      this.phoneValid = isValid;
      console.log(isValid);
    }
  }
};
</script>

