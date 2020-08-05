
/* Common function to get the correct name in production. */

export function domainName(): string {
    const domain: string =  window.location.host;

    // console.log("Domain-> " , domain);

    if (domain.indexOf('localhost') !== -1){
        return 'http://' + domain.substring(0, 9) + ':8080';
    }

    let correctDomain: string;

    if (domain === 'www.boudreault.xyz'){
        correctDomain = 'https://www.boudreault.xyz';
    }else{
        correctDomain = 'https://boudreault.xyz';
    }

    return correctDomain;
}