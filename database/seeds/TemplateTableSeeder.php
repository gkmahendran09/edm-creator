<?php

use Illuminate\Database\Seeder;

class TemplateTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $templates = array(
              array('id' => '1','template_name' => 'Blank','html_header' => '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta content="telephone=no" name="format-detection" />
            <meta content="width=device-width" name="viewport" />
            <title>Citibank</title>','html_footer' => '</body>
            </html>','css' => '<style type="text/css">
            	body { width: 100%; margin: 0; padding: 0;-webkit-text-size-adjust: none;-ms-text-size-adjust: none;	-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100%; height: 100%; }
            	img { line-height: 100%; outline: none;text-decoration: none; }
            	a img {border: none; }
            	p {margin: 1em 0; }
            	h1, h2, h3, h4, h5, h6 { line-height: 100%; }
            	table td { border-collapse: collapse; }
            	a {color: #000000;	text-decoration: none; }
            	.clear { clear:both; }
            	.spacing-content { width:28px; }
            	.footer-online{ width:50%;}
            	.sepline{width: 600px; margin: 0 auto;display: block;}
            	.footer-city-online{width: 100%; border-right: 1px solid #ccc; padding-right: 5px;}
            	.citi-lst-link{padding-left: 0px; width:100%;    margin-left: 15px;}
            	.citi-lst-link li{padding-bottom: 3px; list-style: disc; font-family:Arial;font-size:12px;color: #676767; line-height:15px; }
            	.citi-lst-right{padding-left: 0px; margin-left: 15px; margin-top: 0; margin-bottom: 0;}
            	.citi-lst-right li{padding-bottom: 10px; list-style: disc; font-family:Arial;font-size:12px;color: #676767; line-height:15px; }
            	.citi-sp-head{text-transform: uppercase; padding-top: 3px; width:247px; font-size: 18px; color: #fff; padding-left: 20px; line-height: 18px;}
            	/* iPhone 5 */
            	@media only screen and (max-width: 580px) {

            		*[class].container {
            			width: 100% !important;
            			max-width: 100% !important;
            			clear: both !important;
            		}

            		*[class].spacing-content { width:10px !important; }
            		*[class].spacing-content img { width:10px !important; }
            		.sepline{width:100%; display: block;}
            		.citi-title-img, .citi-title-img img{width: 100%;}
            		.citi-sp-head{width:50%}
            	}

            	/* iPhone landscape */
            	@media only screen and (max-width: 480px) {
            		*[class].container {
            			width: 100% !important;
            			max-width: 100% !important;
            			clear: both !important;
            		}
            		*[class].content-main {
            			width: 100% !important;
            			max-width: 100% !important;
            			clear: both !important;
            		}
            		*[class].header-content{width: 100% !important;max-width: 100% !important;}

            		*[class].mob-how-it-cont{padding: 0px 10px 0px 10px !important;}
            		*[class].mob-how-it-cont1{padding: 0px 10px 0px 10px !important;    line-height: 16px !important;}
            		*[class].footer-online{ width:100% !important;display: block;    padding-bottom: 20px;    float: left;}
            		*[class].spacing-content { width:10px !important; }
            		*[class].spacing-content img { width:10px !important; }

            	}


            	@media screen and (max-width:479px){
            		*[class].container {
            			width: 100% !important;
            			max-width: 100% !important;
            			clear: both !important;
            		}
            		*[class].mob-how-it-cont{padding: 0px 10px 0px 10px !important;}
            		*[class].mob-how-it-cont1{padding: 0px 10px 0px 10px !important;    line-height: 16px !important;}
            		*[class].footer-online{ width:100% !important;display: block;    padding-bottom: 20px;    float: left;}
            		*[class].spacing-content { width:10px !important; }
            		*[class].spacing-content img { width:10px !important; }
            		.citi-side-left, .citi-side-right{width:100% !important;display: block;   padding-bottom: 20px;}
            		.citi-empty{padding-bottom: 0 !important;}
            		.citi-main1{width:100%;padding: 10px !important;}
            		.citi-travel{padding: 0 !important;}
            		.footer-city-online{border: none;}
            		.citi-sp-head{width:100%;padding: 5px 15px;}
            		.citi-title-img{display: none;}
            	}

            </style>
            </head>
            <body style="background-color:#ffffff; position:relative">','html' => '<table border="0" cellpadding="0" cellspacing="0" style="border: 1px solid {{edm.properties.borderColor}}" width="{{edm.properties.width}}" height="{{edm.properties.height}}" align="center"><tr><td style="padding-top: {{edm.properties.paddingTop}}px;padding-right: {{edm.properties.paddingRight}}px;padding-bottom: {{edm.properties.paddingBottom}}px;padding-left: {{edm.properties.paddingLeft}}px;"><row-directive id="0" edm="edm"></row-directive><row-directive id="1" edm="edm"></row-directive><row-directive id="2" edm="edm"></row-directive><row-directive id="3" edm="edm"></row-directive></td></tr></table>','scope_values' => '{
              "properties": {
                "width": 600,
                "height": "auto",
                "borderColor": "#ddd",
                "paddingTop": 0,
                "paddingRight": 0,
                "paddingBottom": 0,
                "paddingLeft": 0
              },
              "currentId": 0,
              "totalRows": 1,
              "rows": [
                {
                  "id":0,
                  "columns": [
                    {
                      "id":0,
                      "backgroundColor": "#ccc",
                      "content": "Row 1 Column 1"
                    }
                  ]
                } ]
            }','created_by' => 'Super Admin','updated_by' => 'Super Admin','created_at' => '2016-02-17 13:49:17','updated_at' => '2016-02-25 18:41:03')
        );


          DB::table('templates')->insert($templates);
    }
}
