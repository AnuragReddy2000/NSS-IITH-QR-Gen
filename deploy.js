const util = require('util');
const exec = util.promisify(require('child_process').exec);

let build = async () => {
    console.log("Deleting existing build directory and re-building");
    await exec("rmdir /s /q build");
    //await exec("browserify src/utils/worker_utils.js -o public/web_worker.js");
    await exec("npm run build");
    await exec("git add .");
    try{
        await exec('git commit -m "Building for deployment"');
    } catch (e){
        console.log(e)
    }
    console.log("delploying to gh-pages");
    await exec("git checkout gh-pages");
    await exec("git pull");
    console.log("removing existing files from gh-pages");
    await exec("git rm --cached -r *");
    await exec("git add .gitignore");
    await exec("git clean -f -d");
    console.log("adding new build to gh-pages");
    await exec("xcopy /s build .");
    await exec("git add .");
    await exec('git commit -m "build successful"');
    console.log("pushing changes");
    await exec("git push -u origin gh-pages");
    await exec("git checkout main");
    console.log("Success! deploy completed!");
}

build();