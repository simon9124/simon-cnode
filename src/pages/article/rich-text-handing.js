// 需要在rich-text调整的样式：
export const richTextHandingObj = {
  // 1.将table里面的\n全部去掉（须在换行符改成<hr>前执行）
  "table>\n": "table>",
  "thead>\n": "thead>",
  "tr>\n": "tr>",
  "th>\n": "th>",
  "tbody>\n": "tbody>",
  "td>\n": "td>",
  "tfoot>\n": "tfoot>",
  // 2.换行符默认会被清空，手动设置为<br>标签又含高度，因此用一个看不见的<hr>来代替
  "\n": "<hr style='width:0;height:0;visibility:hidden;'>",
  // 3.其他标签追加样式
  "<h1":
    "<h1 style='font-size: 2em;line-height: 1.2em;margin: 0.67em 0;border-bottom: 1px solid #eee;word-break: break-word;'",
  "<h2":
    "<h2 style='font-size: 1.7em;margin: 0.5em 0;border-bottom: 1px solid #eee;'",
  "<h3":
    "<h3 style='font-size: 1.7em;margin: 0.5em 0;border-bottom: 1px solid #eee;'",
  "<h4": "<h4 style='font-size: 1.2em;margin: 1.33em 0;'",
  "<h5": "<h5 style='font-size: 0.83em;margin: 1.67em 0;'",
  "<h6": "<h6 style='font-size: 0.67em;margin: 2.33em 0;'",
  "<p+(?!r)": "<p style='margin: 0.3em 0;'",
  "<blockquote":
    "<blockquote style='padding-left:15px;background:#fff;border-left:5px solid #eee;'",
  "<ul": "<ul style='margin:0.3em 10px;padding-left: 16px;'",
  "<ol": "<ol style='margin:0.3em 10px;padding-left: 16px;'",
  "<li": "<li style='word-break:break-word;font-size:0.9em;line-height:1.8em;'",
  "<a": "<a style='color: #08c;'",
  "<img": "<img style='width:100%'",
  "<pre": "<pre style='overflow:auto;padding:8px;background:#f7f7f7;'",
  "<table":
    "<table style='width:100%;font-size:0.86em;text-align:center;border-collapse:collapse;border:1px solid #e0e0e0;'",
  "<th+(?!e)":
    "<th style='overflow:auto;background:#f8f8f8;padding:5px;border:1px solid #e0e0e0;'",
  "<td": "<td style='overflow:auto;padding:5px;border:1px solid #e0e0e0;'",
};

// this.$set(this.article, "content", this.article.content.replace(new RegExp("<td", "gi"),
//   "<td style=\"overflow:auto;padding:5px;border:1px solid #e0e0e0;\" "));
