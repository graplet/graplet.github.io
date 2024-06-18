from flask import Flask, render_template  

app = Flask(__name__,template_folder='')

@app.route('/')
def main():
  return render_template('index.html')

@app.route('/<path:path>/')
def path(path):
  return render_template(f'{path}/index.html')

app.run(port=8080, host='0.0.0.0')