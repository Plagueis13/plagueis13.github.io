class Locale{
  constructor() { 
    this.locale;
    this.defaultLocale = 'dal';
    this.city;
    this.defaultCity = 'Dallas';
  }

  getLocationData() {
    if(localStorage.getItem('locale') === null) {
      this.locale = this.defaultLocale;
      this.city = this.defaultCity;
    } else {
      this.locale = localStorage.getItem('locale');
      this.city = localStorage.getItem('city');
    }
    return this.locale;
  
  }

  async downloadItems() {
    const response = await fetch (`cfa_rewards_${this.locale}.json`);
    const responseData = await response.json();
    return responseData;
  };
  
}