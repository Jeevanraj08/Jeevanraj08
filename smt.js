    //----import html2canvas.js & FileSaver.js libary-------

    function require(jspath) {
        for (i = 0; i < jspath.length; i++) {
            document.write('<script type="text/javascript" src="' + jspath[i] + '"><\/script>');
        }
    }
    var files = ['https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js', 'https://github.com/niklasvh/html2canvas/releases/download/v1.0.0-rc.5/html2canvas.js'];
    require(files);



    //----Create generate and save image button-------

    $("body").append('<div id="to_save"><button onClick="generate();">Generate</button><button type="button" class="download-btn">Save Image</button><div id="apend-here"></div></div>');


    //----button and screen css style property-------
    var style = document.createElement('style');
    style.innerHTML = `
    .cancel {
        position: absolute;float:right; right: 0px; top: 0px;
    }
    .cont{ position: relative; float: left;}
    #to_save{padding-top:10px;padding-left:310px;}
    `;
    document.head.appendChild(style);


    //---- Append screen on broswer function statement-------

    var count = 0;
        function generate() {
                html2canvas(document.querySelector("#wrapper")).then(function (canvas) {
                //	document.getElementById("apend-here").appendChild(canvas);
                count++;
                let genClass = "gen-div"+count;
                let genBtnId = "btn"+count;
                let genDiv = '<div class="cont"><button type="button" id="'+genBtnId+'" class="cancel">X</button><div id="'+count+'" class="'+genClass+' canvas-area"></div></div>';
                $("#apend-here").append(genDiv);
                $("."+genClass).append(canvas);
                });	
            } 

    //---- downalod screen on local function statement-------
        
        $(document).on( "click", ".download-btn", function() {
        $(".canvas-area").each(function() {
            let id = this.id;
            let selDiv = ".gen-div"+id;
            html2canvas(document.querySelector(selDiv)).then(canvas => {
            canvas.toBlob(function(blob) {
            let imgName = "my_image"+id+".jpg";
            window.saveAs(blob, imgName);
            }); 
            });
        });
            
        });
    //---- Remove unwanted screen function statement-------
        $(document).on("click", ".cancel", function(e) {
        e.preventDefault();
        let bid = $(this).attr("id");
        let id =  bid.slice(3);
        let selDiv = ".gen-div"+id;
        $(selDiv).remove();
        $(this).remove();
        });



    //..............additional scroll body height increase function............

    $("#viewport").bind("click", function () {

        $(this).css("height","900px");

        $("#wrapper, #footer_content_main_Inner_1").css("height","900px");

        $(" #redline").hide();

    });

    $("#footnote_down").bind("click", function () {

        $("#viewport").css("height","248px");

        $("#wrapper, #footer_content_main_Inner_1").css("height","248px");

        $("#scrollbar, #redline").show();

    });


