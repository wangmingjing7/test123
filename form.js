$(function () {
    let prodouct = [{//初始界面数据
        name: "商品名",
        weekdayused: "000",
        fridayused: "000",
        weekendused: "000",
    }, {
        name:"麺",
        weekdayused:"288",
        fridayused:"336",
        weekendused:"432",
    }, {
        name:"スープ",
        weekdayused:"13",
        fridayused:"15",
        weekendused:"20",
    }, {
        name:"チャーシュー",
        weekdayused:"25",
        fridayused:"30",
        weekendused:"45",
    }, {
        name:"焼豚",
        weekdayused:"",
        fridayused: "",
        weekendused:"",
    }, {
        name:"赤胡椒",
         weekdayused:"",
        fridayused: "",
        weekendused:"",
    }, {
        name:"青ネギ",
        weekdayused:"2.5",
        fridayused:"2.5",
        weekendused:"4",
    }, {
        name:"白ネギ",
        weekdayused:"1",
        fridayused:"1",
        weekendused:"1.5",
    }, {
        name:"だし",
        weekdayused:"2",
        fridayused:"2",
        weekendused:"3",
    }, {
        name:"秘伝",
        weekdayused:"1",
        fridayused:"1",
        weekendused:"1",
    }, {
        name:"酸味",
        weekdayused:"",
        fridayused: "",
        weekendused:"",
    }, {
        name:"にんにく",
        weekdayused:"1",
        fridayused:"1.5",
        weekendused:"1.5",
    }, {
        name:"油",
        weekdayused:"3",
        fridayused:"4",
        weekendused:"5",
    }, {
        name:"米",
        weekdayused:"",
        fridayused: "",
        weekendused:"",
    }, {   
        name:"唐辛子粉",
        weekdayused:"",
        fridayused:"",
        weekendused:"",
    }, {   
        name:"塩",
        weekdayused:"",
        fridayused:"",
        weekendused:"",
    }, {   
        name:"きくらげ",
        weekdayused:"",
        fridayused:"",
        weekendused:"",
    }, {   
        name:"のり",
        weekdayused:"",
        fridayused:"",
        weekendused:"",
    }, {   
        name:"抹茶杏仁豆腐",
        weekdayused:"",
        fridayused:"",
        weekendused:"",
    }, {   
        name:"抹茶ソース",
        weekdayused:"",
        fridayused:"",
        weekendused:"",
    }, {   
        name:"玉子",
        weekdayused:"40",
        fridayused:"40",
        weekendused:"55",
    }];
    let page = 1;//第几页
    let no = 0;//显示的页数的第一个对象是数组中的第几个对象，初始下标为0
    let proNumber = prodoucts.length;
    for (let i = 0; i < 30; i++) {//初始页面信息显示
        let prodouct = $("<tr>" + "<td><input type=\"checkbox\"></td>" + "<td>" + (i + 1) + "</td>" + "<td>" + prodoucts[i].name + "</td>" + "<td>" + prodoucts[i].weekdayused + "</td>" + "<td>" + prodoucts[i].fridayused + "</td>" + "<td>" + prodoucts[i].weekendused + "</td>" + "<td><a href=\"javascript:;\" class=\"check\">確認</a> <a href=\"javascript:;\" class=\"modify\">変更</a></td>" + "</label></tr>");
        $("tbody").append(prodouct);
    }
    $("tbody").trigger("create");//trigger() 方法触发被选元素上指定的事件以及事件的默认行为（比如表单提交）
    $("#pgn").text(page);
    $("#en").text(proNumber);
    $("#add").click(function () {//点击新增按钮触发的动作
        $("#sbg").addClass("sbg");
        $("#asi").show();
    });
 
    let objKeys = [ "name", "weekdayused", "fridayused", "weekendused"];
    $("#submit").click(function () {//提交按钮点击触发的动作
        let prodouct = {};
        let isEmpty = false;
        $("#asi").find("input").each(function (index, domEle) {
            if (!domEle.value) {//如果添加时表单内有值为空，则不进行添加
                isEmpty = true;
                /*return;*/
            }
            prodouct[objKeys[index]] = domEle.value;
        });
        if (!isEmpty) {
           prodoucts[proNumber] = prodouct;
            proNumber++;
            $("#en").text(proNumber);
            $("#sbg").removeClass("sbg");
            $("#asi").hide();
            $("tbody tr:first").siblings().remove();//清空界面
            let lpren = $("tbody tr").length - 1;//最后一页剩余的条目数;
            if (no + 10 > proNumber && lpren < 10) {//增加一个append函数，如果显示的是最后一页那么需要更新界面。
                $("tbody tr:last").after("<tr>" + "<td><input type=\"checkbox\"></td>" + "<td>" + (no + lpren + 1) + "</td>" + "<td>" + prodouct.name + "</td>" + "<td>" + prodouct.weekdayused + "</td>" + "<td>" + prodouct.fridayused + "</td>" + "<td>"
                    + prodouct.weekendused + "</td>" + "<td><a href=\"javascript:;\" class=\"check\">確認</a> <a href=\"javascript:;\" class=\"modify\">変更</a></td>" + "</tr>");
             let i = 0;
             while (i < 30 && no + i < proNumber) {
                                let prodouct = $("<tr>" + "<td><input type=\"checkbox\"></td>" + "<td>" + (no + i + 1) + "</td>" + "<td>" + prodoucts[no + i].name + "</td>" + "<td>" + prodoucts[no + i].weekdayused + "</td>" + "<td>" + prodoucts[no + i].fridayused + "</td>" + "<td>"
                                    + prodoucts[no + i].weekendused  + "</td>" + "<td><a href=\"javascript:;\" class=\"check\">確認</a> <a href=\"javascript:;\" class=\"modify\">変更</a></td>" + "</tr>");
                                $("tbody").append(prodouct);
                                i++;
                            }
            }
        }
        $("#sbg").removeClass("sbg");
        $("#asi").hide();
 
    });
 
    $("tbody").on("click", ".check", function () {//点击確認按钮触发的动作
        $("#sbg").addClass("sbg");
        $("#chesi").show();
        let stuIndex = $(this).parent().parent().find("td")[1].innerText - 1;
        let i = 0;
        $("#chesi").find("input").each(function (index, domEle) {
            domEle.value = prodoucts[stuIndex][objKeys[index]];//index->i
        });
    });
 
    let modifyNumber;
    $(".modify").click(function () {//jQuery出现的新添加元素点击事件无效
         $("#sbg").addClass("sbg");
         $("#chasi").show();
         modifyNumber = $(this).parent().parent().find("td")[1].innerText - 1;
         let i = 0;
         $("#chasi").find("input").each(function (index, domEle) {
             domEle.value = prodoucts[modifyNumber][objKeys[i++]];
         });
     });
    $("tbody").on("click", ".modify", function () {//点击変更按钮触发的动作,解决了jQuery出现的新添加元素点击事件无效问题
        $("#sbg").addClass("sbg");
        $("#chasi").show();
        modifyNumber = $(this).parent().parent().find("td")[1].innerText - 1;
        let i = 0;
        $("#chasi").find("input").each(function (index, domEle) {
            domEle.value = prodoucts[modifyNumber][objKeys[i++]];
        });
    });
 
 
    $("#save").click(function () {//点击保存按钮触发的动作
        $("#chasi").find("input").each(function (index, domEle) {
            if (domEle.value)
                prodoucts[modifyNumber][objKeys[index]] = domEle.value;
        });
        $("tbody tr").eq(modifyNumber - no + 1).remove();
        $("tbody tr").eq(modifyNumber - no).after("<tr>" + "<td><input type=\"checkbox\"></td>" + "<td>" + (modifyNumber - no + 1) + "</td>" + "<td>" + prodoucts[modifyNumber].schoolNumber + "</td>" + "<td>" + prodoucts[modifyNumber].name + "</td>" + "<td>" + prodoucts[modifyNumber].weekdayused + "</td>" + "<td>" + prodoucts[modifyNumber].fridayused + "</td>" + "<td>"
            + prodoucts[modifyNumber].weekendused + "</td>" + "<td>" + prodoucts[modifyNumber].class + "</td>" + "<td>" + prodoucts[modifyNumber].age + "</td>" + "<td><a href=\"javascript:;\" class=\"check\">確認</a> <a href=\"javascript:;\" class=\"modify\">変更</a></td>" + "</tr>");
        $("tbody tr:first").siblings().remove();//清空界面
        for (let i = no; i < no+10; i++) {//初始页面信息显示
            let prodouct = $("<tr>" + "<td><input type=\"checkbox\"></td>" + "<td>" + (i + 1) + "</td>" + "<td>" + prodoucts[i].name + "</td>" + "<td>" + prodoucts[i].weekdayused + "</td>" + "<td>" + prodoucts[i].fridayused + "</td>" + "<td>"
                + prodoucts[i].weekendused + "</td>" + "<td>" + prodoucts[i].class + "</td>" + "<td>" + prodoucts[i].age + "</td>" + "<td><a href=\"javascript:;\" class=\"check\">確認</a> <a href=\"javascript:;\" class=\"modify\">変更</a></td>" + "</tr>");
            $("tbody").append(prodouct);
        }
        $("tbody").trigger("create");
        $("#sbg").removeClass("sbg");
        $("#chasi").hide();
    });
 
 
    $(".cancel").click(function () {//多个取消按钮点击触发的动作
        $("#sbg").removeClass("sbg");
        $(".achaesi").hide();
    });
 
    $("tbody tr td:first").click(function () {//全选操作用到了JQuery的隐示迭代
        $("tbody tr td input").prop("checked", $("tbody tr:first td:first input").prop("checked"));
    });
 
    $("tbody").on("click", $("tbody tr:nth-of-type(1)").siblings().find("input"), function () {
        let isSelectAll = true;
        $("tbody tr:nth-of-type(1)").siblings().find("input").each(function (index, domEle) {
            if ($(domEle).prop("checked") == false)
                isSelectAll = false;
        });
        $("tbody tr:first td:first input").prop("checked", isSelectAll);
    })
 
    let update = (no) => {
        let i = 0;//用于增加信息条目的变量;
        $("tbody tr:first").siblings().remove();//清空界面
        while (i < 10 && no + i < proNumber) {
            let prodouct = $("<tr>" + "<td><input type=\"checkbox\"></td>" + "<td>" + (no + i + 1) + "</td>" + "<td>" + prodoucts[no + i].schoolNumber + "</td>" + "<td>" + prodoucts[no + i].name + "</td>" + "<td>" + prodoucts[no + i].weekdayused + "</td>" + "<td>" + prodoucts[no + i].fridayused + "</td>" + "<td>"
                + prodoucts[no + i].weekendused + "</td>" + "<td>" + prodoucts[no + i].class + "</td>" + "<td>" + prodoucts[no + i].age + "</td>" + "<td><a href=\"javascript:;\" class=\"check\">確認</a> <a href=\"javascript:;\" class=\"modify\">変更</a></td>" + "</tr>");
            $("tbody").append(prodouct);
            i++;
        }
        $("tbody").trigger("create");
    }
 
    $("#delete").click(function () {
        if (confirm("削除しますか？")) {
            let delNumber = 0;//删除的信息条目数;
            let delIndexs = []; //删除信息条目的下标;用于后期处理避免“落空”导致移动无效
            let i = 0;//用于增加信息条目的变量;
            $("tbody tr td input").each(function (index, domEle) {
                if (index != 0 && $(domEle).prop("checked")) {//index != 0,防止标题行被删除
                    delIndexs[delIndexs.length] = $(domEle).parent().next().text() - 1;
                    $(domEle).parent().parent().remove();
                    delNumber++;
                }
            });
 
            for (let j = delIndexs.length - 1; j >= 0; j--) {
                for (let k = delIndexs[j]; k < proNumber - 1; k++) {//低效的代码，需要大量移动对象索引;对JS不太熟悉，还没有想到高效的解决办法!
                    prodoucts[k] = prodoucts[k + 1];
                }
            }
 
            proNumber -= delNumber;//指向储存底层数据(学生对象)的数组尾部的指针“移动”
            $("#en").text(proNumber);//更新条目数
            if (proNumber == no) {
                no -= 10;
                page--;
                $("#pgn").text(page);
            }
            update(no);
             $("tbody tr:first").siblings().remove();//清空界面
                        while (i < 10 && no + i < proNumber) {
                            let prodouct = $("<tr>" + "<td><input type=\"checkbox\"></td>" + "<td>" + (no + i + 1)+ "</td>" + "<td>" + prodoucts[no + i].name + "</td>" + "<td>" + prodoucts[no + i].weekdayused + "</td>" + "<td>" + prodoucts[no + i].fridayused + "</td>" + "<td>"
                                + prodoucts[no + i].weekendused + "</td>" + "<td><a href=\"javascript:;\" class=\"check\">確認</a> <a href=\"javascript:;\" class=\"modify\">変更</a></td>" + "</tr>");
                            $("tbody").append(prodouct);
                            i++;
                        }
                        $("tbody").trigger("create");
            $("tbody tr td:first input").prop("checked", false);
        }
    });
 
    $("#nextpage").click(function () {
        if (no + 10 < proNumber) {
            no += 10;
            page++;
            $("#pgn").text(page);
            update(no);
            $("tbody tr:first td:first input").prop("checked", false);
            let i = 0;//用于增加信息条目的变量;
            $("tbody tr:first").siblings().remove();//清空界面
            while (i < 10 && no + i < proNumber) {
                let prodouct = $("<tr>" + "<td><input type=\"checkbox\"></td>" + "<td>" + (no + i + 1) + "</td>" + "<td>" + prodoucts[no + i].name + "</td>" + "<td>" + prodoucts[no + i].weekdayused + "</td>" + "<td>" + prodoucts[no + i].fridayused + "</td>" + "<td>"
                    + prodoucts[no + i].weekendused  + "</td>" + "<td><a href=\"javascript:;\" class=\"check\">確認</a> <a href=\"javascript:;\" class=\"modify\">変更</a></td>" + "</tr>");
                $("tbody").append(prodouct);
                i++;
            }
            $("tbody").trigger("create");
        } else {
            alert("最後のページです。");
        }
    });
 
    $("#lastpage").click(function () {
        if (no - 10 >= 0) {
            no -= 10;
            page--;
            $("#pgn").text(page);
            update(no);
            $("tbody tr:first td:first input").prop("checked", false);
           let i = 0;//用于增加信息条目的变量;
                $("tbody tr:first").siblings().remove();//清空界面
                        while (i < 10 && no + i < proNumber) {
                            let prodouct = $("<tr>" + "<td><input type=\"checkbox\"></td>" + "<td>" + (no + i + 1) + "</td>" + "<td>" + prodoucts[no + i].schoolNumber + "</td>" + "<td>" + prodoucts[no + i].name + "</td>" + "<td>" + prodoucts[no + i].weekdayused + "</td>" + "<td>" + prodoucts[no + i].fridayused + "</td>" + "<td>"
                                + prodoucts[no + i].weekendused + "</td>" + "<td>" + prodoucts[no + i].class + "</td>" + "<td>" + prodoucts[no + i].age + "</td>" + "<td><a href=\"javascript:;\" class=\"check\">確認</a> <a href=\"javascript:;\" class=\"modify\">変更</a></td>" + "</tr>");
                            $("tbody").append(prodouct);
                            i++;
                        }
                        $("tbody").trigger("create");
        } else {
            alert("最初のページです。");
        }
    });
 
})
