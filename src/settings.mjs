import dotenv from "dotenv";
import dotenvExpand from 'dotenv-expand';

let env = dotenv.config();
dotenvExpand(env);

function withoutTrailingSlash(s) {
    return s ? s.replace(/\/$/, "") : null
}

function isEmptyOrUndefined(name, value) {
    if (!value || value.trim() === '') {
        throw Error(`${name} is null or undefined. This usually append if 
        you override this variable from your environment. Try to unset this by running
        unset ${name}`)
    }
}

const variables = Object.entries(process.env)
    .filter(e => e[0].startsWith("NAVI_"))
    .map(e => {
        isEmptyOrUndefined(e[0], e[1]);
        e[1] = withoutTrailingSlash(e[1]);
        return e
    })


export default Object.fromEntries(JSON.parse(JSON.stringify(variables)));