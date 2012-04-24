import flask

app = flask.Flask(__name__)

@app.route("/")
def main_page():
    return flask.render_template("index.html")

if __name__ == "__main__":
    app.run()

    
