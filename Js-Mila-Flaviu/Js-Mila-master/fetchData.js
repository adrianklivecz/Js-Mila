class FetchData {
    constructor(carousel) {
      this.createInput();
      this.setOnEnter();
      this.carousel = carousel;
      this.url = "";
    }
  
    createInput() {
      const input = document.getElementById("search")
      this.inputRef = input;
    }
  
    setOnEnter() {
      this.inputRef.addEventListener("keydown", this.handleEnter);
    }
  
    handleEnter = event => {
      if (event.key === "Enter") {
        this.fetchRecipes();
      }
    };
  
    fetchRecipes() {

      if (this.url !== this.generateUrl()) {
        this.url = this.generateUrl();
        fetch(this.url)
          .then(response => response.json())
          .then(this.generateImgUrl);
      }
    }
  
    generateImgUrl = json => {
      if (json.meals) {
        this.imgUrls = json.meals.map(function(element) {
          return element.strMealThumb;
        });
  
        this.carousel.setImgUrls(this.imgUrls);
      }
    };
  
    generateUrl = () =>
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.inputRef.value}`;
  }