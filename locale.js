class Locale{
  constructor() { 
    this.locale;
    this.defaultLocale = 'dal'
  }

  getLocationData() {
    if(localStorage.getItem('locale') === null) {
      this.locale = this.defaultLocale;
    } else {
      this.locale = localStorage.getItem('locale');
    }
    return this.locale;
  
  }

  async downloadItems() {
    const response = await fetch (`cfa_rewards_${this.locale}.json`);
    const responseData = await response.json();
    return responseData;
  };
  
}