import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class GetGiphy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      GiphyData: [],
      limit: 12,
      showModal: false,
      caption: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.refVal = React.createRef();
  }

  enlargeImg(img) {
    img.style.width = "300px";
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(event) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      console.log("you're at the bottom of the page");
      this.setState({ limit: this.state.limit + 12 });
      // this.handleInfinite();
      // console.log(this.refVal.current.value);
      // console.log(this.state.value);
      this.handleInfinite();
    }
  }

  async handleInfinite() {
    // console.log(selector);
    // this.setState({ value: event.target.value });
    let url = `https://api.giphy.com/v1/gifs/search?api_key=wBxZoI7BPYUSn1LFBwKtwFTdqfjYjI8r&q=${this.refVal.current.value}&limit=${this.state.limit}`;

    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      GiphyData: data.data,
      loading: true,
    });
  }

  async handleChange(event) {
    this.setState({ value: event.target.value });
    // console.log(event.target.value);
    let url = `https://api.giphy.com/v1/gifs/search?api_key=wBxZoI7BPYUSn1LFBwKtwFTdqfjYjI8r&q=${event.target.value}&limit=${this.state.limit}`;

    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      GiphyData: data.data,
      loading: true,
      value: event.target.value,
    });
    // console.log(this.state.value);
  }
  updateField(event) {
    if (
      (event.charCode >= 0 && event.charCode <= 47) ||
      (event.charCode >= 58 && event.charCode <= 64) ||
      (event.charCode >= 91 && event.charCode <= 96) ||
      (event.charCode >= 123 && event.charCode <= 126)
    ) {
      event.preventDefault();
    }
    this.setState({ limit: 12 });
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Search :
            <input
              type="text"
              className="searchGif"
              onKeyPress={(event) => this.updateField(event)}
              ref={this.refVal}
              onChange={this.handleChange}
            />
          </label>
        </form>

        <div>
          {this.state.GiphyData.map((GifData) => (
            <img
              className="w-25 p-10"
              key={GifData.id}
              src={GifData.images.fixed_height_downsampled.webp}
              onClick={() => {
                this.setState({
                  showModal: true,

                  modalSrc: GifData.images.downsized_medium.url,
                });
              }}
            />
          ))}{" "}
          <div
            id="myModal"
            className="modal"
            style={{ display: this.state.showModal ? "block" : "none" }}
          >
            <div>
              <span
                className="close"
                onClick={() => this.setState({ showModal: false })}
              >
                &times;
              </span>
              <img className="w-50 h-50" src={this.state.modalSrc} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
