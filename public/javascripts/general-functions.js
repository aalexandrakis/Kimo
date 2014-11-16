    function fromIsoToEuro(dateString){
            var regExp = /(\d{4}).(\d{2}).(\d{2}).(\d{2}).(\d{2}).(\d{2}).*/;
            dateArray = regExp.exec(dateString);
            return dateArray[3] + "-" + dateArray[2] + "-" + dateArray[1] + " " + dateArray[4] + ":" + dateArray[5] + ":" + dateArray[6];
    }