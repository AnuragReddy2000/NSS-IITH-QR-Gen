const util = require('util');
const exec = util.promisify(require('child_process').exec);

let build = async () => {
    console.log("delploying to gh-pages");
    await exec("git checkout gh-pages");
    console.log("removing existing files from gh-pages");
    await exec("git rm --cached -r *");
    await exec('git commit -m "deleting previous build"');
    await exec("git pull");
    console.log("adding new build to gh-pages");
    await exec("git add -f build/*");
    await exec('git commit -m "build successful"');
    console.log("pushing changes");
    await exec("git pull");
    await exec("git push -u origin gh-pages");
    await exec("git checkout main");
    console.log("Success! deploy completed!");
}

build();