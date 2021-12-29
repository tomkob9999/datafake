// Default Values
const defaults = {
    num_recs: 100,
    max_num_recs: 10000,
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

const genTypes = [
    {value: "", title: "Select Type"},
    {value: "fname", title: "First Name", func: ()=>faker.name.firstName()},
    {value: "lname", title: "Last Name", func: ()=>faker.name.lastName()},
    {value: "fullname", title: "Full Name", func: ()=>(faker.name.lastName() + " " +  faker.name.firstName())},
    {value: "dob", title: "Dat of Birth", func: ()=>{
        var dob = faker.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)"));
        dob = dob.getFullYear() + "-" + (dob.getMonth()+1) + "-" + dob.getDate();
        return dob
    }},
    {value: "gender", title: "Gender", func: ()=>faker.name.gender()},
    {value: "faddress", title: "Full Address", func: ()=>faker.address.zipCode() + " "  + faker.address.state() + ""  + faker.address.city() + ""  + faker.address.streetAddress()},
    {value: "faddresswoz", title: "Full Address w/o Zip", func: ()=>faker.address.stateAbbr() + " "  + faker.address.city() + " "  + faker.address.streetAddress()},
    {value: "zip", title: "Zip", func: ()=>faker.address.zipCode()},
    {value: "street", title: "Street Address", func: ()=>faker.address.streetAddress()},
    {value: "city", title: "City", func: ()=>faker.address.city()},
    {value: "state", title: "State", func: ()=>faker.address.state()},
    {value: "password", title: "Password", func: ()=>faker.internet.password()},
    {value: "phone", title: "Phone Number", func: ()=>faker.phone.phoneNumber()},
    {value: "email", title: "Email", func: ()=>{
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
    // if (actlocales.length > 0) {
    //     // actlocales.map((v) => {
    //     //     const vals = 
    //     //     const sel0 = document.querySelector(".select1");
    //     //     let option0 = document.createElement("option");
    //     //     option.text = v.title;
    //     //     option.value = v.name;
    //     //     sel1.appendChild(option); 
    //     // });
    // } else {
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


        newCell = newRow.insertCell();
        const input2 = document.createElement("input");
        input2.setAttribute("type", "text");
        input2.setAttribute("class", "form-control");
        input2.setAttribute("placeholder", "Length");
        input2.setAttribute("aria-label", "Length");
        input2.setAttribute("aria-describedby", "basic-addon1");
        newCell.appendChild(input2);
        
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
                if (j == 0) {
                    // console.log(cell.innerHTML);
                    let text10 = cell.getElementsByTagName('input')[0];
                    // console.log(text10.value);
                    obj = {...obj, name: text10.value};
                }
                if (j == 1) {
                    // console.log(cell.innerHTML);
                    var sel3 = cell.getElementsByTagName('select')[0];
                    // console.log(sel3.value);

                    const func = genTypes.filter((d) => d.value == sel3.value)[0].func;
                    obj = {...obj, type: sel3.value, func: func};
                }
                if (j == 2) {
                    // console.log(cell.innerHTML);
                    let text11 = cell.getElementsByTagName('input')[0];
                    // console.log(text11.value);
                    obj = {...obj, length: text11.value};
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
                    jsonrec[fields[index].name] = d.func();
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
                    ss += d.func();
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
