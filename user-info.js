class UserInfo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.userName = "trngdothuy";
    this.userData = [];
  }

  connectedCallback() {
    this.fetchActivity()
      .then(() => {
        this.render();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // fetch the data from the Codewars API
  async fetchActivity() {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${this.userName}`
    );
    const data = await response.json();
    this.userData = data; // set the userData property with the fetched data
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
        :host {
           --rank: ${this.userData.ranks.overall.color};
           font: 600 100%/1 system-ui, sans-serif;
        }
        data { 
            color: pink;
            padding: 1em .5em;
            display: flex;
            justify-content: center;
            margin: 0 26rem;
        }      
      </style>
        <data>
        Username: ${this.userData.username}<br>
        Challenges Completed: ${this.userData.codeChallenges.totalCompleted}<br>
        Leaderboard Position: ${this.userData.leaderboardPosition}
        </data>`;
  }
}

customElements.define("user-info", UserInfo);
