class Calculator {
  constructor() {
    // Initialize default values
    this.avgAnnualCostAML = 80 * 1000;
    this.activePlayers = 50000;
    this.suspiciousActivityAlerts = 10;
    this.avgTimeToReviewAlert = 60;
    this.avgEDDReviews = 1;
    this.avgTimeToPerformEDD = 6 * 60;
    this.suspiciousActivityReports = 1;
    this.timeToInvestigateSAR = 2 * 60;
    this.percentageRiskScored = 5 / 100;
    this.timeToScoreSinglePlayer = 30;

    // Initialize event listeners, calculations, and range sliders
    this.initEventListeners();
    this.initEmailResultsButton();
    this.initFromURLParams();
    this.updateCalculations();
    this.loadAndInitializeRangeSlider();
  }

  // Method to construct the URL with query parameters
  constructURLWithParams() {
    const queryParams = new URLSearchParams({
      avgAnnualCostAML: this.avgAnnualCostAML,
      activePlayers: this.activePlayers,
      suspiciousActivityAlerts: this.suspiciousActivityAlerts,
      avgTimeToReviewAlert: this.avgTimeToReviewAlert,
      avgEDDReviews: this.avgEDDReviews,
      avgTimeToPerformEDD: this.avgTimeToPerformEDD,
      suspiciousActivityReports: this.suspiciousActivityReports,
      timeToInvestigateSAR: this.timeToInvestigateSAR,
      percentageRiskScored: this.percentageRiskScored,
      timeToScoreSinglePlayer: this.timeToScoreSinglePlayer
    }).toString();

    // Construct the full URL using window.location.href for the current page URL
    const fullURL = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${queryParams}`;

    return fullURL;
  }

  initEventListeners() {
    // Attach event listeners to each input element
    this.attachInputListener(
      "avgAnnualCostAMLInput",
      (value) => (this.avgAnnualCostAML = value * 1000)
    );
    this.attachInputListener(
      "activePlayersInput",
      (value) => (this.activePlayers = value)
    );
    this.attachInputListener(
      "suspiciousActivityAlertsInput",
      (value) => (this.suspiciousActivityAlerts = value)
    );
    this.attachInputListener(
      "avgTimeToReviewAlertInput",
      (value) => (this.avgTimeToReviewAlert = value)
    );
    this.attachInputListener(
      "avgEDDReviewsInput",
      (value) => (this.avgEDDReviews = value)
    );
    this.attachInputListener(
      "avgTimeToPerformEDDInput",
      (value) => (this.avgTimeToPerformEDD = value * 60)
    );
    this.attachInputListener(
      "suspiciousActivityReportsInput",
      (value) => (this.suspiciousActivityReports = value)
    );
    this.attachInputListener(
      "timeToInvestigateSARInput",
      (value) => (this.timeToInvestigateSAR = value * 60)
    );
    this.attachInputListener(
      "percentageRiskScoredInput",
      (value) => (this.percentageRiskScored = value / 100)
    );
    this.attachInputListener(
      "timeToScoreSinglePlayerInput",
      (value) => (this.timeToScoreSinglePlayer = value)
    );
  }

  attachInputListener(elementId, assignValueCallback) {
    const element = document.getElementById(elementId);
    element.addEventListener("input", (event) => {
      // Check if the input value is a positive number
      const value = event.target.valueAsNumber;
      if (value > 0) {
        assignValueCallback(value);
        this.updateCalculations();
      } else {
        // If the value is not positive, reset the input to its default value
        event.target.value = element.defaultValue;
      }
    });
  }

  // Method to initialize the calculator with URL parameters if present
  initFromURLParams() {
    const params = new URLSearchParams(window.location.search);

    // Helper function to parse number from URL parameter
    const parseNumber = (paramValue, defaultValue) => {
      const parsed = Number(paramValue);
      return isNaN(parsed) ? defaultValue : parsed;
    };

    if (params.toString() !== "") {
      this.avgAnnualCostAML = parseNumber(
        params.get("avgAnnualCostAML"),
        this.avgAnnualCostAML
      );
      this.activePlayers = parseNumber(
        params.get("activePlayers"),
        this.activePlayers
      );
      this.suspiciousActivityAlerts = parseNumber(
        params.get("suspiciousActivityAlerts"),
        this.suspiciousActivityAlerts
      );
      this.avgTimeToReviewAlert = parseNumber(
        params.get("avgTimeToReviewAlert"),
        this.avgTimeToReviewAlert
      );
      this.avgEDDReviews = parseNumber(
        params.get("avgEDDReviews"),
        this.avgEDDReviews
      );
      this.avgTimeToPerformEDD = parseNumber(
        params.get("avgTimeToPerformEDD"),
        this.avgTimeToPerformEDD
      );
      this.suspiciousActivityReports = parseNumber(
        params.get("suspiciousActivityReports"),
        this.suspiciousActivityReports
      );
      this.timeToInvestigateSAR = parseNumber(
        params.get("timeToInvestigateSAR"),
        this.timeToInvestigateSAR
      );
      this.percentageRiskScored = parseNumber(
        params.get("percentageRiskScored"),
        this.percentageRiskScored
      );
      this.timeToScoreSinglePlayer = parseNumber(
        params.get("timeToScoreSinglePlayer"),
        this.timeToScoreSinglePlayer
      );

      // After parsing the parameters, update the data attributes
      this.updateDataAttributes();
      // Update the input fields to reflect these values
      this.updateInputFields();
    }
  }

  // Method to update the data attributes for the range sliders
  updateDataAttributes() {
    this.setDataAttribute(
      "avgAnnualCostAMLHandle",
      this.avgAnnualCostAML / 1000
    );
    this.setDataAttribute(
      "avgTimeToReviewAlertHandle",
      this.avgTimeToReviewAlert
    );
    this.setDataAttribute(
      "avgTimeToPerformEDDHandle",
      this.avgTimeToPerformEDD / 60
    );
    this.setDataAttribute(
      "timeToInvestigateSARHandle",
      this.timeToInvestigateSAR / 60
    );
    this.setDataAttribute(
      "percentageRiskScoredHandle",
      this.percentageRiskScored * 100
    );
    this.setDataAttribute(
      "timeToScoreSinglePlayerHandle",
      this.timeToScoreSinglePlayer
    );
  }

  // Helper method to set individual data attribute
  setDataAttribute(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
      element.setAttribute("fs-rangeslider-start", value);
    }
  }

  loadAndInitializeRangeSlider() {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@finsweet/attributes-rangeslider@1/rangeslider.js";
    script.onload = () => {};
    document.body.appendChild(script);
  }

  // Method to update the input fields with the values from the URL parameters
  updateInputFields() {
    // Update input fields
    document.getElementById("avgAnnualCostAMLInput").value =
      this.avgAnnualCostAML / 1000;
    document.getElementById("activePlayersInput").value = this.activePlayers;
    document.getElementById(
      "suspiciousActivityAlertsInput"
    ).value = this.suspiciousActivityAlerts;
    document.getElementById(
      "avgTimeToReviewAlertInput"
    ).value = this.avgTimeToReviewAlert;
    document.getElementById("avgEDDReviewsInput").value = this.avgEDDReviews;
    document.getElementById("avgTimeToPerformEDDInput").value =
      this.avgTimeToPerformEDD / 60;
    document.getElementById(
      "suspiciousActivityReportsInput"
    ).value = this.suspiciousActivityReports;
    document.getElementById("timeToInvestigateSARInput").value =
      this.timeToInvestigateSAR / 60;
    document.getElementById("percentageRiskScoredInput").value =
      this.percentageRiskScored * 100;
    document.getElementById(
      "timeToScoreSinglePlayerInput"
    ).value = this.timeToScoreSinglePlayer;
  }

  // Method to initialize the email results button event listener
  initEmailResultsButton() {
    const emailResultsButton = document.getElementById("emailResultsButton");
    const emailResultsNameInput = document.getElementById("emailResultsName");
    const emailResultsMessageInput = document.getElementById(
      "emailResultsMessage"
    );

    // Function to construct the message with the current name and URL
    const constructMessage = () => {
      const name = emailResultsNameInput.value;
      const urlWithParams = this.constructURLWithParams();

      return urlWithParams;
    };

    // Event listener for the email results button
    emailResultsButton.addEventListener("click", () => {
      // Set the value of the input field to the message
      emailResultsMessageInput.value = constructMessage();
    });

    // Event listener for changes in the name input
    emailResultsNameInput.addEventListener("input", () => {
      // Update the message in real-time as the name changes
      emailResultsMessageInput.value = constructMessage();
    });
  }

  updateCalculations() {
    // Update the DOM with the calculated values
    this.displayResults();
  }

  displayResults() {
    document.getElementById(
      "totalHoursSavedDisplay"
    ).innerText = this.calculateTotalHoursSaved();
    document.getElementById(
      "annualProductivityGainsDisplay"
    ).innerText = this.calculateAnnualProductivityGains();
    document.getElementById(
      "totalAnnualMoneySavedDisplay"
    ).innerText = this.calculateTotalAnnualMoneySaved();
    document.getElementById(
      "percentageRiskScoredDisplay"
    ).innerText = this.calculatePercentageRiskScored();
    document.getElementById(
      "expandedRiskCoverageCostDisplay"
    ).innerText = this.calculateExpandedRiskCoverageCost();
    document.getElementById(
      "expandedRisk100CoverageCostDisplay"
    ).innerText = this.calculateExpandedRisk100CoverageCost();
  }

  calculateTotalHoursSaved() {
    let totalMinsSaved = this.calculateTotalMinsSaved();
    return Math.round(totalMinsSaved / 60).toLocaleString();
  }

  calculateAnnualProductivityGains() {
    let totalMinsSaved = this.calculateTotalMinsSaved();
    let totalCurrentMins = this.calculateTotalCurrentMins();
    let annualProductivityGains = (totalMinsSaved / totalCurrentMins) * 100;
    return Math.round(annualProductivityGains).toLocaleString();
  }

  calculateTotalAnnualMoneySaved() {
    let totalMinsSaved = this.calculateTotalMinsSaved();
    let totalAnnualMoneySaved =
      (totalMinsSaved / 60) * (this.avgAnnualCostAML / 2080);
    return Math.round(totalAnnualMoneySaved).toLocaleString();
  }

  calculatePercentageRiskScored() {
    return Math.round(this.percentageRiskScored * 100).toLocaleString();
  }

  calculateExpandedRiskCoverageCost() {
    let expandedRiskCoverageCost = Math.round(
      this.percentageRiskScored *
        this.activePlayers *
        this.timeToScoreSinglePlayer *
        (this.avgAnnualCostAML / 2080 / 60)
    );
    return expandedRiskCoverageCost.toLocaleString();
  }

  calculateExpandedRisk100CoverageCost() {
    let expandedRisk100CoverageCost = Math.round(
      this.activePlayers *
        this.timeToScoreSinglePlayer *
        (this.avgAnnualCostAML / 2080 / 60)
    );
    return expandedRisk100CoverageCost.toLocaleString();
  }

  calculateTotalMinsSaved() {
    let avgTimeToReviewAlertMinsSaved = this.calculateAvgTimeToReviewAlertMinsSaved();
    let avgTimeToPerformEDDMinsSaved = this.calculateAvgTimeToPerformEDDMinsSaved();
    let timeToInvestigateSARMinsSaved = this.calculateTimeToInvestigateSARMinsSaved();
    return (
      avgTimeToReviewAlertMinsSaved +
      avgTimeToPerformEDDMinsSaved +
      timeToInvestigateSARMinsSaved
    );
  }

  calculateTotalCurrentMins() {
    let avgTimeToReviewAlertCurrentMins =
      this.avgTimeToReviewAlert * this.suspiciousActivityAlerts;
    let avgTimeToPerformEDDCurrentMins =
      this.avgEDDReviews * this.avgTimeToPerformEDD;
    let timeToInvestigateSARCurrentMins =
      this.suspiciousActivityReports * this.timeToInvestigateSAR;
    return (
      avgTimeToReviewAlertCurrentMins +
      avgTimeToPerformEDDCurrentMins +
      timeToInvestigateSARCurrentMins
    );
  }

  calculateAvgTimeToReviewAlertMinsSaved() {
    let avgTimeToReviewAlertCurrentMins =
      this.avgTimeToReviewAlert * this.suspiciousActivityAlerts;
    let avgTimeToReviewAlertKinectifyMins = 5 * this.suspiciousActivityAlerts;
    return avgTimeToReviewAlertCurrentMins - avgTimeToReviewAlertKinectifyMins;
  }

  calculateAvgTimeToPerformEDDMinsSaved() {
    let avgTimeToPerformEDDCurrentMins =
      this.avgEDDReviews * this.avgTimeToPerformEDD;
    let avgTimeToPerformEDDKinectifyMins = this.avgEDDReviews * 45;
    return avgTimeToPerformEDDCurrentMins - avgTimeToPerformEDDKinectifyMins;
  }

  calculateTimeToInvestigateSARMinsSaved() {
    let timeToInvestigateSARCurrentMins =
      this.suspiciousActivityReports * this.timeToInvestigateSAR;
    let timeToInvestigateSARKinectifyMins = this.suspiciousActivityReports * 20;
    return timeToInvestigateSARCurrentMins - timeToInvestigateSARKinectifyMins;
  }
}

// Initialize the calculator when the document is fully loaded
document.addEventListener("DOMContentLoaded", () => new Calculator());
