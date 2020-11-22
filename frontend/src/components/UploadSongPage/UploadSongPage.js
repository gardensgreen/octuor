import React from "react";
import { connect } from "react-redux";
import { createSong } from "../../store/song";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            imageUrl: null,
            audioUrl: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateSong = this.updateSong.bind(this);
        this.updateImage = this.updateImage.bind(this);
    }

    update(field) {
        return (e) => this.setState({ [field]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createSong(this.state).then(() => {
            this.setState({
                title: "",
                imageUrl: null,
                audioUrl: null,
            });
        });
    }

    updateFiles(e) {
        const {
            target: { validity, files },
        } = e;
        return validity.valid && this.setState({ images: files });
    }

    updateSong(e) {
        const {
            target: {
                validity,
                files: [file],
            },
        } = e;
        return validity.valid && this.setState({ imageUrl: file });
    }

    updateImage(e) {
        const {
            target: {
                validity,
                files: [file],
            },
        } = e;
        return validity.valid && this.setState({ audioUrl: file });
    }

    render() {
        return (
            <div>
                <h1>AWS S3 Express-React Demo</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input
                            type="text"
                            placeholder="Title"
                            value={this.state.title}
                            onChange={this.update("title")}
                        />
                    </label>
                    <label>
                        Song Upload
                        <input type="file" onChange={this.updateSong} />
                    </label>
                    <label>
                        Image Upload
                        <input type="file" onChange={this.imageFile} />
                    </label>
                    {/* <label>
            Multiple Upload
            <input
              type="file"
              multiple
              onChange={this.updateFiles} />
          </label> */}
                    <input type="submit" value="Create Song" />
                </form>
            </div>
        );
    }
}

const msp = (state) => {
    return {
        user: Object.values(state.session.user),
    };
};

const mdp = (dispatch) => {
    return {
        createSong: (song) => dispatch(createSong(song)),
    };
};

export default connect(msp, mdp)(MainPage);
