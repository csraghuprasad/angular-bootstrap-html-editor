angular.module("htmlEditor", [])
    .directive('htmlEditor', ['$timeout', '$compile', 'getColor', function ($timeout, $compile, getColor) {
        return {
            restrict: 'EA',
            scope: {
                htmlData: '=',
                eRequired: '='
            },
            replace: true,
            template: '<div>' +
            '<div class="head">' +
            '<div class="btn-group" ng-mousedown="checkFocus()">' +
            '<button type="button" class="btn btn-xs btn-default sharp" ng-class="{\'active\':commands.bold.enabled}" onmousedown="event.preventDefault();" ng-click="exeCmd(\'bold\')" ng-if="commands.bold.support" data-toggle="tooltip" title="Bold"><i class="glyphicon glyphicon-bold"></i></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" ng-class="{\'active\':commands.italic.enabled}" onmousedown="event.preventDefault();" ng-click="exeCmd(\'italic\')" ng-if="commands.italic.support" data-toggle="tooltip" title="Italic"><i class="glyphicon glyphicon-italic"></i></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" onmousedown="event.preventDefault();" ng-click="exeCmd(\'indent\')" ng-if="commands.indent.support" data-toggle="tooltip" title="Indent"><i class="glyphicon glyphicon-indent-left"></i></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" onmousedown="event.preventDefault();" ng-click="exeCmd(\'outdent\')" ng-if="commands.outdent.support" data-toggle="tooltip" title="Outdent"><i class="glyphicon glyphicon-indent-right"></i></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" ng-class="{\'active\':commands.justifyLeft.enabled}" onmousedown="event.preventDefault();" ng-click="exeCmd(\'justifyLeft\')" ng-if="commands.justifyLeft.support" data-toggle="tooltip" title="Justify Left"><i class="glyphicon glyphicon-align-left"></i></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" ng-class="{\'active\':commands.justifyCenter.enabled}" onmousedown="event.preventDefault();" ng-click="exeCmd(\'justifyCenter\')" ng-if="commands.justifyCenter.support" data-toggle="tooltip" title="Justify Center"><i class="glyphicon glyphicon-align-center"></i></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" ng-class="{\'active\':commands.justifyRight.enabled}" onmousedown="event.preventDefault();" ng-click="exeCmd(\'justifyRight\')" ng-if="commands.justifyRight.support" data-toggle="tooltip" title="Justify Right"><i class="glyphicon glyphicon-align-right"></i></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" ng-class="{\'active\':commands.justifyFull.enabled}" onmousedown="event.preventDefault();" ng-click="exeCmd(\'justifyFull\')" ng-if="commands.justifyFull.support" data-toggle="tooltip" title="Justify Full"><i class="glyphicon glyphicon-align-justify"></i></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" onmousedown="event.preventDefault();" ng-click="exeCmd(\'insertHorizontalRule\')" ng-if="commands.insertHorizontalRule.support" data-toggle="tooltip" title="Horizontal Rule">HR</button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" ng-class="{\'active\':commands.strikeThrough.enabled}" onmousedown="event.preventDefault();" ng-click="exeCmd(\'strikeThrough\')" ng-if="commands.strikeThrough.support" data-toggle="tooltip" title="Strike Through"><span style="text-decoration: line-through;">S</span></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" ng-class="{\'active\':commands.subscript.enabled}" onmousedown="event.preventDefault();" ng-click="exeCmd(\'subscript\')" ng-if="commands.subscript.support" data-toggle="tooltip" title="Subscript"><i class="glyphicon glyphicon-subscript"></i></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" ng-class="{\'active\':commands.superscript.enabled}" onmousedown="event.preventDefault();" ng-click="exeCmd(\'superscript\')" ng-if="commands.superscript.support" data-toggle="tooltip" title="Superscript"><i class="glyphicon glyphicon-superscript"></i></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" ng-class="{\'active\':commands.underline.enabled}" onmousedown="event.preventDefault();" ng-click="exeCmd(\'underline\')" ng-if="commands.underline.support" data-toggle="tooltip" title="Underline"><span style="text-decoration: underline;">U</span></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" ng-class="{\'active\':commands.foreColor.enabled}" onmousedown="event.preventDefault();" ng-click="getColor()" ng-if="commands.foreColor.support" data-toggle="tooltip" title="Text Color"><i class="glyphicon glyphicon-text-color"></i></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" ng-class="{\'active\':commands.backColor.enabled}" onmousedown="event.preventDefault();" ng-click="getColor(1)" ng-if="commands.backColor.support" data-toggle="tooltip" title="Background Color"><i class="glyphicon glyphicon-text-background"></i></button>' +
            '<div class="btn-group" ng-if="commands.insertOrderedList.support" data-toggle="tooltip" title="List">' +
            '<button type="button" class="btn btn-xs btn-default sharp dropdown-toggle" data-toggle="dropdown"><i class="glyphicon glyphicon-list"></i> <span class="caret"></span></button>' +
            '<ul class="dropdown-menu">' +
            '<li onmousedown="event.preventDefault();" ng-click="exeCmd(\'insertUnorderedList\',\'disc\')"><a>Circle</a></li>' +
            '<li onmousedown="event.preventDefault();" ng-click="exeCmd(\'insertOrderedList\',\'decimal\')"><a>Number</a></li>' +
            '</ul>' +
            '</div>' +
            '<div class="btn-group" ng-if="commands.fontName.support" data-toggle="tooltip" title="Font Name">' +
            '<button type="button" class="btn btn-xs btn-default sharp dropdown-toggle" data-toggle="dropdown"><i class="glyphicon glyphicon-font"></i> <span class="caret"></span></button>' +
            '<ul class="dropdown-menu">' +
            '<li onmousedown="event.preventDefault();" ng-click="exeCmd(\'fontName\',font)" ng-repeat="font in FONTS | orderBy"><a ng-attr-style="{{\'font-family:\'+font}}" ng-bind="font"></a></li>' +
            '</ul>' +
            '</div>' +
            '<div class="btn-group" ng-if="commands.fontSize.support" data-toggle="tooltip" title="Font Size">' +
            '<button type="button" class="btn btn-xs btn-default sharp dropdown-toggle" data-toggle="dropdown"><i class="glyphicon glyphicon-text-size"></i> <span class="caret"></span></button>' +
            '<ul class="dropdown-menu">' +
            '<li onmousedown="event.preventDefault();" ng-click="exeCmd(\'fontSize\',6)"><a><font size="6">Size 6</font></a></li>' +
            '<li onmousedown="event.preventDefault();" ng-click="exeCmd(\'fontSize\',5)"><a><font size="5">Size 5</font></a></li>' +
            '<li onmousedown="event.preventDefault();" ng-click="exeCmd(\'fontSize\',4)"><a><font size="4">Size 4</font></a></li>' +
            '<li onmousedown="event.preventDefault();" ng-click="exeCmd(\'fontSize\',3)"><a><font size="3">Size 3</font></a></li>' +
            '<li onmousedown="event.preventDefault();" ng-click="exeCmd(\'fontSize\',2)"><a><font size="2">Size 2</font></a></li>' +
            '<li onmousedown="event.preventDefault();" ng-click="exeCmd(\'fontSize\',1)"><a><font size="1">Size 1</font></a></li>' +
            '</ul>' +
            '</div>' +
            '<div class="btn-group" ng-if="commands.heading.support" data-toggle="tooltip" title="Heading">' +
            '<button type="button" class="btn btn-xs btn-default sharp dropdown-toggle" data-toggle="dropdown">H <span class="caret"></span></button>' +
            '<ul class="dropdown-menu">' +
            '<li onmousedown="event.preventDefault();" ng-click="exeCmd(\'heading\',\'h1\')"><h1><a>heading 1</a></h1></li>' +
            '<li onmousedown="event.preventDefault();" ng-click="exeCmd(\'heading\',\'h2\')"><h2><a>heading 2</a></h2>></li>' +
            '<li onmousedown="event.preventDefault();" ng-click="exeCmd(\'heading\',\'h3\')"><h3><a>heading 3</a></h3></li>' +
            '<li onmousedown="event.preventDefault();" ng-click="exeCmd(\'heading\',\'h4\')"><h4><a>heading 4</a></h4></li>' +
            '<li onmousedown="event.preventDefault();" ng-click="exeCmd(\'heading\',\'h5\')"><h5><a>heading 5</a></h5></li>' +
            '<li onmousedown="event.preventDefault();" ng-click="exeCmd(\'heading\',\'h6\')"><h6><a>heading 6</a></h6></li>' +
            '</ul>' +
            '</div>' +
            '<button type="button" class="btn btn-xs btn-default sharp" onmousedown="event.preventDefault();" ng-if="commands.createLink.support  && !is_ie" data-toggle="tooltip" title="Link" ng-click="showLinkModal()"><i class="glyphicon glyphicon-link"></i></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" onmousedown="event.preventDefault();" ng-if="commands.unlink.support && !is_ie" data-toggle="tooltip" title="Unlink" ng-click="exeCmd(\'unlink\')"><i class="glyphicon glyphicon-link"  style="text-decoration: line-through;"></i></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" onmousedown="event.preventDefault();" ng-if="commands.insertImage.support && !is_ie" data-toggle="tooltip" title="Image"  ng-click="showImgModal()"><i class="glyphicon glyphicon-picture"></i></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" onmousedown="event.preventDefault();" ng-if="commands.selectAll.support" data-toggle="tooltip" title="Select All" ng-click="exeCmd(\'selectAll\')"><i class="glyphicon glyphicon-move"></i></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" onmousedown="event.preventDefault();" ng-if="commands.undo.support" data-toggle="tooltip" title="Undo" ng-click="exeCmd(\'undo\')"><i class="glyphicon glyphicon-repeat flip"></i></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" onmousedown="event.preventDefault();" ng-if="commands.redo.support" data-toggle="tooltip" title="Redo" ng-click="exeCmd(\'redo\')"><i class="glyphicon glyphicon-repeat"></i></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" onmousedown="event.preventDefault();" ng-if="commands.removeFormat.support"  data-toggle="tooltip" title="Remove Format" ng-click="exeCmd(\'removeFormat\')"><i class="glyphicon glyphicon-remove"></i></button>' +
            '<button type="button" class="btn btn-xs btn-default sharp" onmousedown="event.preventDefault();" ng-disabled="!htmlData" data-toggle="tooltip" title="Preview" ng-click="showPreview()"><i class="glyphicon glyphicon-eye-open"></i></bu>' +
            '</div>' +
            '</div>' +
            '<div contenteditable="true" class="html-editor" spellcheck="false" ng-class="{\'ng-invalid\':eRequired && !htmlData}"></div>' +
            '<div class="foot"><span ng-bind="count?count:0"></span> Word<span ng-bind="count>1?(\'s\'):\'\'"></span></div>' +
            '</div>',
            link: function (scope, element) {
                scope.is_ie = /MSIE|Trident/.test(window.navigator.userAgent);
                scope.is_ff = navigator.userAgent.indexOf("Firefox") != -1;

                var sel, el = $(element).find('.html-editor')[0];
                scope.local = false;
                if (scope.is_ie) {
                    $(el).on("input keydown click change", function () {
                        formatData();
                        checkActiveCommands();
                        wordsCount();
                    })
                }
                else {
                    $(el).on("input click", function () {
                        formatData();
                        checkActiveCommands();
                        wordsCount();
                    })
                }
                $(el).on("paste", function (e) {//drop
                    var cd = e.originalEvent.clipboardData || window.clipboardData;
                    e.preventDefault();
                    e.stopPropagation();
                    var txt = cd.getData('text');
                    if (txt) {
                        if (scope.is_ie) {
                            var n = txt.split(/\r?\n/);
                            txt = "<span>" + n[0] + "</span>";
                            for (var i = 1; i < n.length; i++) {
                                txt = txt + "<div>" + n[i] + "</div>";
                            }
                            pasteHtmlAtCaret(txt);
                            checkActiveCommands();
                        }
                        else {
                            var htm = cd.getData('text/html');
                            if (htm.indexOf('he-e') > -1 && document.queryCommandSupported('insertHTML')) {
                                document.execCommand('insertHTML', false, htm);
                            }
                            else {
                                document.execCommand('insertText', false, txt);
                            }
                        }
                    }

                }).on("drop", function (e) {//drop
                    e.preventDefault();
                    e.stopPropagation();

                }).on('dragenter', function (e) {
                    e.preventDefault();
                }).on('dragover', function (e) {
                    e.preventDefault();
                }).on('keydown', function (e) {
                    var keyCode = e.keyCode || e.which;
                    if (e.shiftKey && e.keyCode === 9) {
                        e.preventDefault();
                        scope.exeCmd('outdent');
                    }
                    else if (keyCode == 9) {
                        e.preventDefault();
                        scope.exeCmd('indent');
                    }
                }).on('click', 'img', function (e) {
                    scope.range = saveSelection();
                    scope.showImgModal($(this));
                    scope.$apply();
                }).on('click', 'a', function (e) {
                    scope.range = saveSelection();
                    scope.showLinkModal($(this));
                    scope.$apply();
                });

                scope.checkFocus = function () {
                    if (!$(el).is(":focus")) {
                        $(el).focus();
                    }
                };

                scope.exeCmd = function (c, d) {
                    if (scope.is_ie && c == 'outdent') {
                        var pn = window.getSelection().focusNode.parentNode;
                        $(pn).closest("blockquote").css('margin', '0');
                    }
                    document.execCommand(c, false, d);
                    checkActiveCommands();
                    formatData()
                };

                scope.showLinkModal = function (e) {
                    scope.range = saveSelection();
                    scope.link = '';
                    scope.linkE = e;
                    if (e) {
                        scope.link = e.attr('href');
                    }
                    $timeout(function () {
                        var linkBLock = $('<div class="html-preview"></div>');
                        $(linkBLock).append('' +
                            '<div class="frame f">' +
                            '<h4 class="mb-10 text-center">Add Link</h4>' +
                            '<form name="linkForm" ng-submit="closeLinkModal(linkForm,link,$event)" novalidate>' +
                            '<label>Link URL</label>' +
                            '<input type="text" class="form-control input-sm" ng-pattern="pat.linkUrl" ng-model="link" required />' +
                            '<div class="mt-15 text-right">' +
                            '<button class="btn btn-xs btn-default sharp remove" type="reset" style="margin-right: 5px">Cancel</button>' +
                            '<button class="btn btn-xs btn-info sharp" type="submit">Add Link</button>' +
                            '</div>' +
                            '</div>' +
                            '</form>' +
                            '</div>');
                        $('body').append(linkBLock).addClass('hp');
                        $compile(linkBLock)(scope);
                        $(linkBLock).on('click', '.remove', function (e) {
                            $(linkBLock).remove();
                            restoreSelection(scope.range);
                            $('body').removeClass('hp');
                        })
                    })
                };
                scope.closeLinkModal = function (f, d, e) {
                    if (f.$invalid)return;
                    restoreSelection(scope.range);
                    var elem = angular.element(e.target);
                    $(elem).closest('.html-preview').remove();
                    $('body').removeClass('hp');
                    if (scope.linkE) {
                        scope.range.selectNode(scope.linkE[0]);
                        scope.exeCmd('createLink', d);
                    }
                    else {
                        if (!d.toUpperCase().startsWith("HTTP://") && !d.toUpperCase().startsWith("HTTPS://")) {
                            d = "http://" + d;
                        }
                        var img = '<a href="' + d + '">' + (getSelectionText() || d) + '</a>';
                        scope.exeCmd('insertHTML', img);
                    }
                };

                scope.showImgModal = function (e) {
                    scope.range = saveSelection();
                    scope.imgE = e;
                    scope.image = {WIDTH_AUTO: true};
                    if (e) {
                        var attr = e.attr('width');
                        if (typeof attr !== typeof undefined && attr !== false) {
                            scope.image.WIDTH_AUTO = false;
                            scope.image.WIDTH = e.attr('width');
                        }
                        scope.image.URL = e.attr('src');
                        scope.image.ALT = e.attr('alt');
                    }
                    $timeout(function () {
                        var imgBLock = $('<div class="html-preview"></div>');
                        $(imgBLock).append('' +
                            '<div class="frame f">' +
                            '<h4 class="mb-10 text-center">Add Image</h4>' +
                            '<form name="imageForm" ng-submit="closeImgModal(imageForm,image,$event)" novalidate>' +
                            '<div class="row">' +
                            '<div class="col-xs-12 mb-15">' +
                            '<label>Image URL</label>' +
                            '<input type="text" class="form-control input-sm" ng-pattern="pat.imageUrl" ng-model="image.URL" required>' +
                            '</div>' +
                            '</div>' +
                            '<div class="row">' +
                            '<div class="col-xs-6">' +
                            '<label>Title</label>' +
                            '<input type="text" class="form-control input-sm" ng-model="image.ALT">' +
                            '</div>' +
                            '<div class="col-xs-6">' +
                            '<label>Width</label>' +
                            '<input type="text" class="form-control input-sm" ng-model="image.WIDTH" required ng-if="!image.WIDTH_AUTO" inp-validation="onlyDigits" maxlength="3">' +
                            '<p class="mt-5"><label class="checkbox-inline f-14"><input type="checkbox" ng-model="image.WIDTH_AUTO"> <span>Auto Width</span></label><p>' +
                            '</div>' +
                            '</div>' +
                            '<div class="mt-15 text-right">' +
                            '<button class="btn btn-xs btn-default sharp remove" type="reset"  style="margin-right: 5px">Cancel</button>' +
                            '<button class="btn btn-xs btn-info sharp" type="submit">Add Image</button>' +
                            '</div>' +
                            '</form>' +
                            '</div>');
                        $('body').append(imgBLock).addClass('hp');
                        $compile(imgBLock)(scope);
                        $(imgBLock).on('click', '.remove', function (e) {
                            $(imgBLock).remove();
                            restoreSelection(scope.range);
                            $('body').removeClass('hp');
                        })
                    })
                };
                scope.closeImgModal = function (f, d, e) {
                    if (f.$invalid)return;
                    restoreSelection(scope.range);
                    var elem = angular.element(e.target);
                    $(elem).closest('.html-preview').remove();
                    $('body').removeClass('hp');
                    if (scope.imgE) {
                        scope.range.selectNode(scope.imgE[0]);
                        scope.exeCmd('delete', 0, null);
                    }
                    var img = '<img src="' + d.URL + '"' + (d.ALT ? ('alt="' + d.ALT + '"') : '') + (!d.WIDTH_AUTO ? ('width="' + d.WIDTH + '"') : '') + '/>';
                    scope.exeCmd('insertHTML', img);

                };

                scope.getColor = function (bg) {
                    scope.range = saveSelection();
                    getColor.get(function (c) {
                        restoreSelection(scope.range);
                        if (bg) {
                            scope.exeCmd('backColor', c);
                        }
                        else {
                            scope.exeCmd('foreColor', c);
                        }
                    })
                };

                scope.$watch('htmlData', function () {
                    if (!scope.local) {
                        scope.setData(el);
                    } else {
                        scope.local = false
                    }
                });

                scope.setData = function (node) {
                    $(node).html(scope.htmlData || '');
                    $(node).find('*').addClass('he-e');
                    if (scope.is_ie || scope.is_ff) {
                        setFormattedData(node, 1);
                    }
                    wordsCount();
                };

                scope.getData = function () {
                    var h = $(el).clone();
                    $(h).find('*').removeAttr('class');
                    if (scope.is_ie || scope.is_ff) {
                        getFormattedData(h[0], 1);
                        scope.htmlData = $(h).html();
                    }
                    else {
                        scope.htmlData = $(h).html();
                    }
                    h = '';
                };

                scope.showPreview = function () {
                    var preview = $('<div class="html-preview"></div>');
                    $(preview).append('<p class="text-right mb-10 f-16"><i class="glyphicon glyphicon-remove pointer c-white remove"></i></p><div class="frame">' + scope.htmlData + '</div>');
                    $('body').append(preview).addClass('hp');
                    $(preview).on('click', '.remove', function (e) {
                        $(preview).remove();
                        $('body').removeClass('hp');
                    })

                };

                scope.pat = {
                    imageUrl: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)+$/,
                    linkUrl: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
                };

                scope.commands = {
                    backColor: {
                        cmd: 'backColor',
                        val: 'color'
                    },
                    bold: {
                        cmd: 'bold'
                    },
                    copy: {
                        cmd: 'copy'
                    },
                    createLink: {
                        cmd: 'createLink'
                    },
                    formatBlock: {
                        cmd: 'formatBlock'
                    },
                    cut: {
                        cmd: 'cut'
                    },
                    'delete': {
                        cmd: 'delete'
                    },
                    fontName: {
                        cmd: 'fontName'
                    },
                    fontSize: {
                        cmd: 'fontSize'
                    },
                    foreColor: {
                        cmd: 'foreColor'
                    },
                    forwardDelete: {
                        cmd: 'forwardDelete'
                    },
                    indent: {
                        cmd: 'indent'
                    },
                    insertHorizontalRule: {
                        cmd: 'insertHorizontalRule'
                    },
                    insertImage: {
                        cmd: 'insertImage'
                    },
                    insertOrderedList: {
                        cmd: 'insertOrderedList'
                    },
                    insertUnorderedList: {
                        cmd: 'insertUnorderedList'
                    },
                    insertParagraph: {
                        cmd: 'insertParagraph'
                    },
                    insertText: {
                        cmd: 'insertText'
                    },
                    italic: {
                        cmd: 'italic'
                    },
                    justifyCenter: {
                        cmd: 'justifyCenter'
                    },
                    justifyFull: {
                        cmd: 'justifyFull'
                    },
                    justifyLeft: {
                        cmd: 'justifyLeft'
                    },
                    justifyRight: {
                        cmd: 'justifyRight'
                    },
                    outdent: {
                        cmd: 'outdent'
                    },
                    paste: {
                        cmd: 'paste'
                    },
                    redo: {
                        cmd: 'redo'
                    },
                    removeFormat: {
                        cmd: 'removeFormat'
                    },
                    selectAll: {
                        cmd: 'selectAll'
                    },
                    strikeThrough: {
                        cmd: 'strikeThrough'
                    },
                    subscript: {
                        cmd: 'subscript'
                    },
                    superscript: {
                        cmd: 'superscript'
                    },
                    underline: {
                        cmd: 'underline'
                    },
                    undo: {
                        cmd: 'undo'
                    },
                    unlink: {
                        cmd: 'unlink'
                    },
                    insertHTML: {
                        cmd: 'insertHTML'
                    },
                    heading: {
                        cmd: 'heading'
                    }
                };

                scope.FONTS=['Arial','Helvetica','Times New Roman','Times','Courier New','Courier','Verdana','Georgia','Palatino','Garamond','Bookman','Comic Sans MS','Trebuchet MS','Arial Black','Impact'];

                for (var c in scope.commands) {
                    scope.commands[c].support = document.queryCommandSupported(c);
                }

                function saveSelection() {
                    if (window.getSelection) {
                        sel = window.getSelection();
                        if (sel.getRangeAt && sel.rangeCount) {
                            return sel.getRangeAt(0);
                        }
                    } else if (document.selection && document.selection.createRange) {
                        return document.selection.createRange();
                    }
                    return null;
                }

                function restoreSelection(range) {
                    if (range) {
                        if (window.getSelection) {
                            sel = window.getSelection();
                            sel.removeAllRanges();
                            sel.addRange(range);
                        } else if (document.selection && range.select) {
                            range.select();
                        }
                    }
                }

                function checkActiveCommands() {
                    for (var c in scope.commands) {
                        if (document.queryCommandSupported(c)) {
                            scope.commands[c].enabled = document.queryCommandState(c);
                        }
                    }
                }

                function formatData() {
                    $(el).find('*').addClass('he-e');
                    $(el).find('blockquote').css({
                        'font-size': 'inherit',
                        'border': '0 solid transparent',
                        'padding': '0',
                        'margin': '0 0 0 20px'
                    });
                    $(el).find('a').attr('target', '_blank');
                    scope.local = true;
                    scope.getData();
                }

                function getSelectionText() {
                    var text = "";
                    if (window.getSelection) {
                        text = window.getSelection().toString();
                    } else if (document.selection && document.selection.type != "Control") {
                        text = document.selection.createRange().text;
                    }
                    return text;
                }

                function pasteHtmlAtCaret(html, txt) {
                    var sel, range;
                    if (window.getSelection) {
                        // IE9 and non-IE
                        sel = window.getSelection();
                        if (sel.getRangeAt && sel.rangeCount) {
                            range = sel.getRangeAt(0);
                            range.deleteContents();
                            var el = document.createElement("div");
                            if (txt) {
                                el.textContent = html;
                            }
                            else {
                                el.innerHTML = html;
                            }

                            var frag = document.createDocumentFragment(), node, lastNode;
                            while ((node = el.firstChild)) {
                                lastNode = frag.appendChild(node);
                            }
                            range.insertNode(frag);

                            if (lastNode) {
                                range = range.cloneRange();
                                range.setStartAfter(lastNode);
                                range.collapse(true);
                                sel.removeAllRanges();
                                sel.addRange(range);
                            }
                        }
                    }
                }

                function getFormattedData(node, parent) {
                    if (!parent && node.nodeType == 1 && !/(script|style)/i.test(node.tagName)) {
                        var attr = $(node).attr('align');
                        if (typeof attr !== typeof undefined && attr !== false) {
                            if (attr != 'left') {
                                $(node).css('text-align', attr);
                            }
                            $(node).removeAttr('align');
                        }
                    }
                    $.each(node.childNodes, function (i, item) {
                        getFormattedData(item)
                    });
                }

                function setFormattedData(node, parent) {
                    if (!parent && node.nodeType == 1 && !/(script|style)/i.test(node.tagName)) {
                        if ($(node).attr("style") && $(node).attr("style").indexOf('text-align') != -1) {
                            var ta = $(node).css('text-align');
                            if (ta) {
                                if (ta.indexOf('center') != -1) {
                                    $(node).attr('align', 'center');
                                }
                                else if (ta.indexOf('right') != -1) {
                                    $(node).attr('align', 'right');
                                }
                                else {
                                    $(node).attr('align', 'left');
                                }
                                $(node).css('text-align', '')
                            }
                        }
                    }
                    $.each(node.childNodes, function (i, item) {
                        setFormattedData(item)
                    });
                }

                function wordsCount() {
                    $timeout(function () {
                        var content = el.textContent.trim();
                        scope.count = content.length ? content.replace(/\s+/g, ' ').split(' ').length : 0;
                    });
                }

                $(document).ready(function () {
                    $('[data-toggle="tooltip"]').tooltip('destroy').tooltip({
                        container: 'body'
                    });
                    if (scope.is_ie) {
                        function controlselectHandler(evt) {
                            evt.preventDefault();
                        }

                        document.body.addEventListener('mscontrolselect', controlselectHandler);
                    }
                    try {
                        var input = document.createElement('input');
                        input.type = 'color';
                        input.value = '!';
                        if (input.type === 'color' && input.value !== '!') {
                            scope.commands.foreColor.support = true;
                            scope.commands.backColor.support = true;
                        }

                    } catch (e) {
                    }
                })
            }
        };
    }])
    .factory('getColor', function () {
        return {
            get: function (callback) {
                var $gc = $("#getColor");
                if (!$gc.length) {
                    $gc = $('<input type="color" id="getColor" style="display:none">');
                    $('body').append($gc);

                }
                $gc.unbind('change');
                $gc.change(function colorInfo() {
                    if (this.value) {
                        callback(this.value);
                    }
                    this.value = '';
                });
                $gc.click();
            }
        }
    });