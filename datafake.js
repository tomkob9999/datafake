// Default Values
const defaults = {
    num_recs: 100,
    max_num_recs: 10000,
    word_min: 2,
    word_max: 10,
    max_word_max: 100,
    para_max: 300,
    max_para_max: 10000,
    int_min: 0,
    int_max: 10000,
    max_int_max: 100000000,
}

// Active Locales.  Leave empty to activate all available locales
const actlocales = [
    {name: 'ja', title: 'Japanese'},
    {name: 'en_US', title: 'English (United States)'}
]

// Available locales
// 0: {name: 'az', title: 'Azerbaijani'}
// 1: {name: 'ar', title: 'Arabic'}
// 2: {name: 'cz', title: 'Czech'}
// 3: {name: 'de', title: 'German'}
// 4: {name: 'de_AT', title: 'German (Austria)'}
// 5: {name: 'de_CH', title: 'German (Switzerland)'}
// 6: {name: 'en', title: 'English'}
// 7: {name: 'en_AU', title: 'English (Australia)'}
// 8: {name: 'en_AU_ocker', title: 'English (Australia Ocker)'}
// 9: {name: 'en_BORK', title: 'English (Bork)'}
// 10: {name: 'en_CA', title: 'English (Canada)'}
// 11: {name: 'en_GB', title: 'English (Great Britain)'}
// 12: {name: 'en_IE', title: 'English (Ireland)'}
// 13: {name: 'en_IND', title: 'English (India)'}
// 14: {name: 'en_US', title: 'English (United States)'}
// 15: {name: 'en_ZA', title: 'English (South Africa)'}
// 16: {name: 'es', title: 'Spanish'}
// 17: {name: 'es_MX', title: 'Spanish (Mexico)'}
// 18: {name: 'fa', title: 'Farsi'}
// 19: {name: 'fi', title: 'Finnish'}
// 20: {name: 'fr', title: 'French'}
// 21: {name: 'fr_CA', title: 'French (Canada)'}
// 22: {name: 'fr_CH', title: 'French (Switzerland)'}
// 23: {name: 'ge', title: 'Georgian'}
// 24: {name: 'hy', title: 'Armenian'}
// 25: {name: 'hr', title: 'Hrvatski'}
// 26: {name: 'id_ID', title: 'Indonesia'}
// 27: {name: 'it', title: 'Italian'}
// 28: {name: 'ja', title: 'Japanese'}
// 29: {name: 'ko', title: 'Korean'}
// 30: {name: 'nb_NO', title: 'Norwegian'}
// 31: {name: 'ne', title: 'Nepalese'}
// 32: {name: 'nl', title: 'Dutch'}
// 33: {name: 'nl_BE', title: 'Dutch (Belgium)'}
// 34: {name: 'pl', title: 'Polish'}
// 35: {name: 'pt_BR', title: 'Portuguese (Brazil)'}
// 36: {name: 'pt_PT', title: 'Portuguese (Portugal)'}
// 37: {name: 'ro', title: 'Romanian'}
// 38: {name: 'ru', title: 'Russian'}
// 39: {name: 'sk', title: 'Slovakian'}
// 40: {name: 'sv', title: 'Swedish'}
// 41: {name: 'tr', title: 'Turkish'}
// 42: {name: 'uk', title: 'Ukrainian'}
// 43: {name: 'vi', title: 'Vietnamese'}
// 44: {name: 'zh_CN', title: 'Chinese'}
// 45: {name: 'zh_TW', title: 'Chinese (Taiwan)'}

const POS_NAME = 0;
const POS_TYPE = 1;
// const POS_LEN = 2;
const POS_MIN = 2;
const POS_MAX = 3;
const POS_DEL = 4;

const genTypes = [
    // {value: "", title: "Select Type"},
    {value: "word", title: "Text (word)", enable_min: true, enable_max: true, func: (min, max)=>{
            var S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            // console.log("max", max);
            var N = crypto.getRandomValues(new Uint16Array(1))[0]%(max-min+1)+min;
            var ss = Array.from(crypto.getRandomValues(new Uint16Array(N))).map((n)=>S[n%S.length]).join('');
            return ss;
        }
    },
    {value: "para", title: "Text (paragraph)", enable_min: false, enable_max: true, func: (max)=>{
            let min = 10;
            var S="abc def ghi jkl mno pqr stu vwx yzA BCDE FGH IJK LMN OPQ RST UVW XYZ";
            // console.log("max", max);
            var N = crypto.getRandomValues(new Uint16Array(1))[0]%(max-min+1)+min;
            var ss = Array.from(crypto.getRandomValues(new Uint16Array(N))).map((n)=>S[n%S.length]).join('').trim();
            ss = ss.replace("  ", " ")
        
            if (ss.length < 10) return "";
            return ss.trim();
        }
    },
    {value: "integer", title: "Integer", enable_min: true, enable_max: true, func: (min, max)=>{
        // console.log("min", min);
        // console.log("max", max);
        var N = crypto.getRandomValues(new Uint32Array(1))[0]%(max-min+1)+min;
        return N;
    }
},
    {value: "fname", title: "First Name", func: ()=>faker.name.firstName()},
    {value: "lname", title: "Last Name", func: ()=>faker.name.lastName()},
    {value: "fullname", title: "Full Name", func: ()=>(faker.name.lastName() + " " +  faker.name.firstName())},
    {value: "dob", title: "Dat of Birth", func: ()=>{
        var dob = faker.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)"));
        dob = dob.getFullYear() + "-" + (dob.getMonth()+1) + "-" + dob.getDate();
        return dob
    }},
    {value: "gender", title: "Gender", enable_min: false, enable_max: false, func: ()=>faker.name.gender()},
    {value: "faddress", title: "Full Address", enable_min: false, enable_max: false, func: ()=>faker.address.zipCode() + " "  + faker.address.state() + ""  + faker.address.city() + ""  + faker.address.streetAddress()},
    {value: "faddresswoz", title: "Full Address w/o Zip", enable_min: false, enable_max: false, func: ()=>faker.address.stateAbbr() + " "  + faker.address.city() + " "  + faker.address.streetAddress()},
    {value: "zip", title: "Zip", enable_min: false, enable_max: false, func: ()=>faker.address.zipCode()},
    {value: "street", title: "Street Address", enable_min: false, enable_max: false, func: ()=>faker.address.streetAddress()},
    {value: "city", title: "City", enable_min: false, enable_max: false, func: ()=>faker.address.city()},
    {value: "state", title: "State", enable_min: false, enable_max: false, func: ()=>faker.address.state()},
    {value: "password", title: "Password", enable_min: false, enable_max: false, func: ()=>faker.internet.password()},
    {value: "phone", title: "Phone Number", enable_min: false, enable_max: false, func: ()=>faker.phone.phoneNumber()},
    {value: "email", title: "Email", enable_min: false, enable_max: false, func: ()=>{
        var firstName = faker.name.firstName(),
        lastName = faker.name.lastName();
        return faker.internet.email(firstName, lastName);
    }},
]

var _locales = [];

// console.log("HelloHello");
// console.log(_locales);

window.onload = () => {
    
    for(var locale in faker.locales) {
        _locales.push({ name: locale, title: faker.locales[locale].title})
    }

    // console.log(_locales);
  
    const thelocale = actlocales.length>0 ? actlocales: _locales;
        thelocale.map((v) => {
            const sel1 = document.querySelector(".select1");
            var option = document.createElement("option");
            option.text = v.title;
            option.value = v.name;
            sel1.appendChild(option);
        });
    
    // }
    const btnadd = document.querySelector("#btnadd");
    btnadd.addEventListener("click", () => {
        // console.log("button clicked");
        const table = document.querySelector(".table");
        let newRow = table.insertRow();

        let newCell = newRow.insertCell();
        const input1 = document.createElement("input");
        input1.setAttribute("type", "text");
        input1.setAttribute("class", "form-control");
        input1.setAttribute("placeholder", "Name");
        input1.setAttribute("aria-label", "FieldName");
        input1.setAttribute("aria-describedby", "basic-addon1");
        newCell.appendChild(input1);

        newCell = newRow.insertCell();
        let select1 = document.createElement("select");
        select1.classList.add("form-select");
        select1.classList.add("select1");
        newCell.appendChild(select1);
        genTypes.map((v) => {
            let option1 = document.createElement("option");
            option1.text = v.title;
            option1.value = v.value;
            select1.appendChild(option1);
        });
        select1.addEventListener("change", (e) => {
            // console.log("type changed");
            const genType = genTypes.filter(d=>d.value==e.target.value)[0];
            // console.log(genType.enable_max);
            // console.log(e.target.parentElement.parentElement.children[4].children[0]);
            if (genType.enable_min) {
                e.target.parentElement.parentElement.children[POS_MIN].children[0].removeAttribute("disabled");
            } else {
                e.target.parentElement.parentElement.children[POS_MIN].children[0].setAttribute("disabled", true);
            }
            if (genType.enable_max) {
                e.target.parentElement.parentElement.children[POS_MAX].children[0].removeAttribute("disabled");
            } else {
                e.target.parentElement.parentElement.children[POS_MAX].children[0].setAttribute("disabled", true);
            }
        });

        // newCell = newRow.insertCell();
        // const input2 = document.createElement("input");
        // input2.setAttribute("type", "text");
        // input2.setAttribute("class", "form-control");
        // input2.setAttribute("placeholder", "Length");
        // input2.setAttribute("aria-label", "Length");
        // input2.setAttribute("aria-describedby", "basic-addon1");
        // newCell.appendChild(input2);
        
        newCell = newRow.insertCell();
        const input4 = document.createElement("input");
        input4.setAttribute("type", "text");
        input4.setAttribute("class", "form-control");
        input4.setAttribute("placeholder", "Min");
        input4.setAttribute("aria-label", "Min");
        input4.setAttribute("aria-describedby", "basic-addon1");
        newCell.appendChild(input4);

        newCell = newRow.insertCell();
        const input3 = document.createElement("input");
        input3.setAttribute("type", "text");
        input3.setAttribute("class", "form-control");
        input3.setAttribute("placeholder", "Max");
        input3.setAttribute("aria-label", "Max");
        input3.setAttribute("aria-describedby", "basic-addon1");
        newCell.appendChild(input3);

        newCell = newRow.insertCell();
        const button1 = document.createElement("button");
        button1.classList.add("btn");
        button1.classList.add("btn-outline-danger");
        button1.style.width = "80px";
        button1.style.height = "35px";
        button1.textContent = "Delete";
        button1.addEventListener("click", (e) => {
            // console.log("delete clicked");
            // console.log(e.target);
            e.target.parentElement.parentElement.remove();
        });
        newCell.appendChild(button1);

    })


    
    const btngen = document.querySelector("#btngen");
    btngen.addEventListener("click", () => {
        const fields = [];
        const table = document.querySelector(".table");
        // for (let row of table.rows) {
        //     fields.push({type: "xxx"})
        //     for(let cell of row.cells){
        //        console.log(cell.inner);
        //     }
        // }

		for (var i=0, rowLen=table.rows.length; i<rowLen; i++) {
            let obj = {}
            if (i == 0) continue;
			for (var j=0, colLen=table.rows[i].cells.length ; j<colLen; j++) {
				var cell = table.rows[i].cells[j];
                if (j == POS_NAME) {
                    // console.log(cell.innerHTML);
                    let text10 = cell.getElementsByTagName('input')[0];
                    // console.log(text10.value);
                    obj = {...obj, name: text10.value};
                }
                else if (j == POS_TYPE) {
                    // console.log(cell.innerHTML);
                    var sel3 = cell.getElementsByTagName('select')[0];
                    // console.log(sel3.value);

                    const func = genTypes.filter((d) => d.value == sel3.value)[0].func;
                    obj = {...obj, type: sel3.value, func: func};
                }
                // else if (j == POS_LEN) {
                //     // console.log(cell.innerHTML);
                //     let text11 = cell.getElementsByTagName('input')[0];
                //     // console.log(text11.value);
                //     obj = {...obj, length: text11.value};
                // }
                else if (j == POS_MIN) {
                    // console.log(cell.innerHTML);
                    let text12 = cell.getElementsByTagName('input')[0];
                    // console.log(text11.value);
                    obj = {...obj, min: text12.value};
                }
                else if (j == POS_MAX) {
                    // console.log(cell.innerHTML);
                    let text13 = cell.getElementsByTagName('input')[0];
                    // console.log(text11.value);
                    obj = {...obj, max: text13.value};
                }
			}
            fields.push(obj);
		}
        // console.log(fields);
        const sel11 = document.querySelector(".select1");
        // console.log("sel11.value");
        // console.log(sel11.value);
        faker.locale = (sel11.value == "") ? "ja" : sel11.value;
        // console.log("faker.locale");
        // console.log(faker.locale);
        let outtext = [];
        let num_recs = defaults.num_recs;
        const sss = document.querySelector("#num_recs").value;
        if (sss != "" && !isNaN(sss)) {
            num_recs = parseInt(sss);
        }
        if (num_recs > defaults.max_num_recs) num_recs = defaults.max_num_recs; 
        // console.log("num_recs", num_recs);

        const outputformat = document.querySelector(".select2").value;
        
        // console.log("outputformat", outputformat);
        let delim = ",";
        
        if (outputformat == "json") {
            const outjson = []
            for (let x=0; x<num_recs; x++) {
                let jsonrec = {}
                let ss = "";
                fields.map((d, index) => {
                    if (d.type == "word") {
                        let min = defaults.word_min;
                        if (d.min != "" && !isNaN(d.min)) min = parseInt(d.min);
                        let max = defaults.word_max;
                        if (d.max != "" && !isNaN(d.max)) max = parseInt(d.max);
                        if (max > defaults.max_word_max) max = defaults.max_word_max;
                        jsonrec[fields[index].name] = d.func(min, max);
                    }
                    else if (d.type == "para") {
                        let max = defaults.para_max;
                        if (d.max != "" && !isNaN(d.max)) max = parseInt(d.max);
                        if (max > defaults.max_para_max) max = defaults.max_para_max;
                        jsonrec[fields[index].name] = d.func(max);
                    }
                    else if (d.type == "integer") {
                        let min = defaults.int_min;
                        if (d.min != "" && !isNaN(d.min)) min = parseInt(d.min);
                        let max = defaults.int_max;
                        if (d.max != "" && !isNaN(d.max)) max = parseInt(d.max);
                        if (max > defaults.int_word_max) max = defaults.int_word_max;
                        jsonrec[fields[index].name] = d.func(min, max);
                    }
                    else {
                        jsonrec[fields[index].name] = d.func();
                    }
                })
                outjson.push(jsonrec);
            }
            const ta1 = document.querySelector("#ta1");
            ta1.textContent = JSON.stringify(outjson, null, "\t");
        } else {
            
            if (outputformat == "tsv") 
            delim = "\t";
            let ss = "";
            fields.map((d, index) => {
                if (index > 0) ss += delim;
                // console.log(d.type);
                // console.log(d.func());
                ss += d.name;
            })
            outtext.push(ss);
            for (let x=0; x<num_recs; x++) {
                ss = "";
                fields.map((d, index) => {
                    if (index > 0) ss += delim;
                    // console.log(d.type);
                    // console.log(d.func());
                    if (d.type == "word") {
                        let min = defaults.word_min;
                        if (d.min != "" && !isNaN(d.min)) min = parseInt(d.min);
                        let max = defaults.word_max;
                        if (d.max != "" && !isNaN(d.max)) max = parseInt(d.max);
                        if (max > defaults.max_word_max) max = defaults.max_word_max;
                        ss += d.func(min, max);
                    }
                    else if (d.type == "para") {
                            let max = defaults.para_max;
                            if (d.max != "" && !isNaN(d.max)) max = parseInt(d.max);
                            if (max > defaults.max_para_max) max = defaults.max_para_max;
                            ss += d.func(max);
                    }
                    else if (d.type == "integer") {
                        let min = defaults.int_min;
                        if (d.min != "" && !isNaN(d.min)) min = parseInt(d.min);
                        let max = defaults.int_max;
                        if (d.max != "" && !isNaN(d.max)) max = parseInt(d.max);
                        if (max > defaults.int_word_max) max = defaults.int_word_max;
                        ss += d.func(min, max);
                    }
                    else {
                        ss += d.func();
                    }
                })
                outtext.push(ss);
            }
            const str7 = outtext.join("\n");
            const ta1 = document.querySelector("#ta1");
            ta1.textContent = str7;
        } 
        // console.log("locale is");
        // console.log(faker.locale);
        // console.log(outtext);
    })

    const btncopy = document.querySelector("#btncopy");
    btncopy.addEventListener("click", () => {
        const ta1 = document.querySelector("#ta1");
        navigator.clipboard.writeText(ta1.value).then(e => {
          console.log('Copied');
        });
    });
}
