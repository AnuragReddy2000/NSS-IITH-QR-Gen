const util = require('util');
const exec = util.promisify(require('child_process').exec);

let build = async () => {
    console.log("delploying to gh-pages");
    await exec("git checkout gh-pages");
    await exec("git pull");
    console.log("removing existing files from gh-pages");
    await exec("git rm --cached -r *");
    await exec("git checkout .");
    await exec("cp /build/* .");
    console.log("adding new build to gh-pages");
    await exec("git add .");
    await exec('git commit -m "build successful"');
    console.log("pushing changes");
    await exec("git push -u origin gh-pages");
    await exec("git checkout main");
    console.log("Success! deploy completed!");
}

build();