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

        <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label for="exampleFormControlSelect1">Sex <font class="text-danger">*</font></label>
              <select 
                id="exampleFormControlSelect1" 
                v-model="selectedSex" 
                class="form-control">
                <option>Male</option>
                <option>Female</option>
                <option>Unisexual</option>
                <option>NoSexual</option>
              </select>
            </div>
          </div> <!-- End of column -->
          <div class="col-md-3">
            <div class="form-group">
              <label for="exampleFormControlSelect1">Where you heard about us?</label>
              <select 
                id="exampleFormControlSelect1" 
                v-model="selectedSource" 
                class="form-control">
                <option>Friend</option>
                <option>Facebook</option>
                <option>Indeed.ca</option>
                <option>Monster.ca</option>
                <option>Linkedin.com</option>
              </select>
            </div>
          </div> <!-- End of column -->
          <div class="col-md-3">
            <div class="form-group">
              <label for="exampleFormControlSelect1">Are you disabled?</label>
              <select 
                id="exampleFormControlSelect1" 
                v-model="selectedDisabled" 
                class="form-control">
                <option>No anwser</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div> <!-- End of column -->
          <div class="col-md-3">
            <div class="form-group">
              <label for="exampleFormControlSelect1">Are you a veteran?</label>
              <select 
                id="exampleFormControlSelect1" 
                v-model="selectedVeteran" 
                class="form-control">
                <option>No anwser</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div> <!-- End of column -->
        </div> <!-- End of row -->

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
  name: "State2",
  data() {
    return {
      radioValue: 0,
      errors: [],
      selectedVeteran: null,
      selectedSex: null,
      selectedSource: null,
      selectedDisabled: null
    };
  },

  methods: {
    // Emit the state to parent component

    formValidation: function(e) {
      if (this.selectedSex) {
        bus.$emit("next", "State3");
        bus.$emit("selectedSex", this.selectedSex);
        this.$router.push("/State3");
      }

      this.errors = [];

      if (!this.selectedSex) {
        this.errors.push("Selection of sex is mandatory");
      }

      e.preventDefault();
    }
  }
};
</script>
