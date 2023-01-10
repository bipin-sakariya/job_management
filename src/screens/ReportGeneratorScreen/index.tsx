import { Alert, FlatList, Image, PermissionsAndroid, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { ButtonTab, CalendarView, Container, CustomActivityIndicator, CustomBlackButton, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import { styles } from './styles'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import { colors } from '../../styles/Colors'
import CustomReportDetailsView from '../../components/CustomReportDetailsView'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import TableHeaderView from '../../components/TableHeaderView'
import TableDetailsComponent from '../../components/TableDetailsComponent'
import { strings } from '../../languages/localizedStrings'
import { convertDate } from '../../utils/screenUtils'
import RNFetchBlob from 'rn-fetch-blob'
import { generatedReportDetails, generateReport, JobDetailsData, resetGeneratedReportDetailsReducer } from '../../redux/slices/AdminSlice/jobListSlice'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { billData } from '../../redux/slices/AdminSlice/billListSlice'


const ReportGeneratorScreen = () => {
  const navigation = useCustomNavigation('ReportGeneratorScreen');
  const dispatch = useAppDispatch()

  const [btn, setBtn] = useState({ open: true, close: false })
  const [range, setRange] = useState(0);
  const [sdate, setSdate] = useState('');
  const [edate, setEdate] = useState(' ');
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [JobDetailsPage, setJobDetailsPage] = useState<number>(1)
  const [isJobDetailsApiCalled, setIsJobDetailsApiCalled] = useState<boolean>(false)

  const { generatedReport, generatedReportJobDetails, generatedReportSumUp } = useAppSelector(state => state.jobList)

  const XDate = require("xdate")

  useEffect(() => setupMarkedDates(sdate, edate), [range]);


  useEffect(() => {
    return () => {
      dispatch(resetGeneratedReportDetailsReducer())
    }
  }, [])


  const createPDF = async () => {
    let options = {
      // html: '<h1>PDF TEST</h1>',
      html: `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    th, td {
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 5px;
      padding-right: 5px;
    }
    td{
      text-align: center;
    }
  </style>
</head>

<body>
  <h4></h4>
  <h1>This is pdf</h1>
  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}
  
  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}

  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}


  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}


  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}


  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}


  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}


  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}



  {% for data in context %}
  <table border="2">
    <thead>
      <th>job_id</th>
      <th>address</th>
      <th>description</th>
      <th>created_by</th>
      <th>created_at</th>
    </thead>
    <tr>
      <td>{{data.id}}</td>
      <td>{{data.address}}</td>
      <td>{{data.description}}</td>
      <td>{{data.created_by}}</td>
      <td>{{data.created_at}}</td>
    </tr>
    <table border="1 px">
      <thead>
        <th>bill_name</th>
        <th>bill_unit</th>
        <th>quantity</th>
      </thead>
      {% for x in data.bills %}
      <tr>
        <td>{{x.bill_name}}</td>
        <td>{{x.bill_unit}}</td>
        <td>{{x.quantity}}</td>
      </tr>
      {% endfor %}
    </table>
  </table>
  <br>
  {% endfor %}


</body>

</html>`,
      fileName: 'test',
      directory: 'Documents',
    };
    console.log('options ---------------', { options })
    let file = await RNHTMLtoPDF.convert(options)
    console.log("HERE IS THE PATH ------", file.filePath);
    // RNFetchBlob.ios.openDocument(file.filePath)
    FileViewer.open(file.filePath)
  }


  LocaleConfig.locales['hebrew'] = {
    monthNames: ['יָנוּאָר', 'פברואר', 'מרץ', 'אַפּרִיל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'סֶפּטֶמבֶּר', 'אוֹקְטוֹבֶּר', 'נוֹבֶמבֶּר', 'דֵצֶמבֶּר'],
    monthNamesShort: ['ינואר', 'פברואר', 'לְקַלְקֵל', 'אפריל', 'מאי', 'מאי', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
    dayNames: ['יוֹם רִאשׁוֹן', 'יוֹם שֵׁנִי', 'יוֹם שְׁלִישִׁי', 'יום רביעי', 'יוֹם חֲמִישִׁי', 'יוֹם שִׁישִׁי', 'יום שבת'],
    dayNamesShort: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
    today: 'היום עכשיו'
  };

  LocaleConfig.defaultLocale = 'hebrew';

  const data = [
    {
      title: '9 Oxford st.',
      date: '2 May 2022',
      description: 'Lorem Ipsum is simply dummy text of the typesetting in.......',
      author: 'Robert Kramer',
      activity: [
        {
          title: 'Asphalt Paint',
          size: '2.5',
          parameter: 'Meter'
        },
        {
          title: 'New Pole',
          size: '677',
          parameter: 'Unite'
        },
        {
          title: 'Asphalt Paint',
          size: '2.5',
          parameter: 'KG'
        },
      ]
    },
    {
      title: '9 Oxford st.',
      date: '2 May 2022',
      description: 'Lorem Ipsum is simply dummy text of the typesetting in.......',
      author: 'Robert Kramer',
      activity: [
        {
          title: 'Asphalt Paint',
          size: '2.5',
          parameter: 'Meter'
        },
        {
          title: 'New Pole',
          size: '677',
          parameter: 'Unite'
        },
        {
          title: 'Asphalt Paint',
          size: '2.5',
          parameter: 'KG'
        },
      ]
    }
  ]

  const SammedData = [
    {
      srno: "01",
      name: "Asphalt Paint",
      qty: "15",
      unit: "Meter",
      parameter: "Meter",
      imageUrl: ''
    },
    {
      srno: "01",
      name: "Asphalt Paint",
      qty: "1",
      unit: "Meter",
      parameter: "Meter",
      imageUrl: 'dssdfsdfsf'
    },
    {
      srno: "01",
      name: "Asphalt Paint",
      qty: "1",
      unit: "Meter",
      parameter: "Meter",
      imageUrl: ''
    },
    {
      srno: "01",
      name: "Asphalt Paint",
      qty: "",
      unit: "Meter",
      parameter: "Meter",
      imageUrl: 'dssdfsdfsf'
    },
    {
      srno: "01",
      name: "Asphalt Paint",
      qty: "1",
      unit: "Meter",
      parameter: "Meter",
      imageUrl: 'dssdfsdfsf'
    },

    {
      srno: "01",
      name: "Asphalt Paint",
      qty: "1",
      unit: "Meter",
      parameter: "Meter",
      imageUrl: ''
    },
    {
      srno: "01",
      name: "Asphalt Paint",
      qty: "",
      unit: "Meter",
      parameter: "Meter",
      imageUrl: ''
    },
    {
      srno: "01",
      name: "Asphalt Paint",
      qty: "1",
      unit: "Meter",
      parameter: "Meter",
      imageUrl: ''
    },
  ]

  const setupMarkedDates = (fromDate: string, toDate: string) => {
    let markedDates: any = {};
    let isNotValid = false;
    const mFromDate = XDate(fromDate);
    const mToDate = XDate(toDate);
    setRange(mFromDate.diffDays(mToDate));

    if (fromDate === toDate) {
      markedDates = {
        [toDate]: {
          color: colors.dark_blue1_color,
          textColor: colors.white_color,
          startingDay: true,
          endingDay: true,
        },
      };
    }
    else {
      for (let i = 0; i <= range; i++) {
        const tempDate = mFromDate
          .addDays(i === 0 ? 0 : 1)
          .toString('yyyy-MM-dd');
        markedDates[tempDate] = {
          color: i === 0 ? colors.transparent : i === range ? colors.transparent : colors.white_color,
          textColor: i === 0 || i === range ? colors.white_color : colors.grey_18,
          startingDay: i === 0,
          endingDay: i === range,
        }
      }
    }
    if (!isNotValid) {
      setSdate(fromDate);
      setEdate(toDate);
    }
  };

  const onDayPress = (date: any) => {
    if (sdate === edate) {
      if (sdate > date.dateString) {
        setupMarkedDates(date.dateString, sdate);
      } else {
        setupMarkedDates(sdate, date.dateString);
      }
    } else {
      setupMarkedDates(date.dateString, date.dateString);
    }
  }

  const downloadFile = () => {
    const { dirs } = RNFetchBlob.fs;

    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `report.doc`,
        path: `${dirs.DownloadDir}/report.doc`,
      },
      path: `${dirs.DocumentDir}/report.doc`,
    }).fetch('GET', 'https://www.sample-videos.com/doc/Sample-doc-file-100kb.doc')
      // http://www.africau.edu/images/default/sample.pdf           **
      // https://filesamples.com/samples/document/txt/sample3.txt   **
      // https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx **
      // https://filesamples.com/samples/document/xlsx/sample3.xlsx **
      // https://www.sample-videos.com/doc/Sample-doc-file-100kb.doc **
      .then((res) => {
        RNFetchBlob.ios.openDocument(res.data)
      }).catch((e) => {
        console.log("DOWN--- Catch", { e })
      })
  }

  // report generating functionality
  const checkPermissionForDownloadFile = async () => {
    // createPDF()
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadFile()
        } else {
          Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      downloadFile()
    }
  }

  const renderItem = ({ item, index }: { item: JobDetailsData & billData, index: number }) => {
    return (
      <>
        {
          btn.open ?
            <View style={styles.mainListView}>
              <View style={[globalStyles.rowView, { justifyContent: "space-between", alignItems: 'center' }]}>
                <Text style={[styles.titleTxt, globalStyles.rtlStyle]}>{item?.address}</Text>
                <Text style={[styles.commonTxt, globalStyles.rtlStyle]}>{moment(item?.updated_at).format('ll')}</Text>
              </View>
              <Text numberOfLines={1} style={[styles.commonTxt, globalStyles.rtlStyle, { marginVertical: wp(1) }]}>{item?.description}</Text>
              <View style={[styles.sepratorLine]} />
              <View style={[globalStyles.rowView, { justifyContent: 'space-between', marginVertical: wp(0.5) }]}>
                <Text style={[styles.commonTxt, globalStyles.rtlStyle, { color: colors.dark_blue1_color }]}>{strings.doneBy}</Text>
                <Text style={[styles.authorTxt, globalStyles.rtlStyle]}>{item?.closed_by?.user_name ?? item?.closed_by?.email.split('@', 1)}</Text>
              </View>
              <View style={styles.sepratorLine} />
              {
                item?.bills?.map((bill) => {
                  return (
                    <CustomReportDetailsView billDetail={bill} />
                  )
                })
              }
            </View> :
            <>
              <TableDetailsComponent type='report' item={item} index={index} isViewOnly />
            </>
        }
      </>
    )
  }

  return (
    <View style={globalStyles.container}>
      {isLoading && <CustomActivityIndicator />}
      <Header
        headerLeftStyle={{
          paddingLeft: wp(3)
        }}
        headerLeftComponent={
          <TouchableOpacity style={[globalStyles.rowView, { width: wp(55), }]} onPress={() => { navigation.goBack() }}>
            <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
            <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{strings.reportGenerator}</Text>
          </TouchableOpacity>
        }
      />
      <Container style={{ paddingHorizontal: wp(4) }}>
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
          <View style={[globalStyles.rowView]}>
            <Image source={ImagesPath.note_icon} style={styles.noteIconStyle} />
            <Text style={[styles.reportTxt, globalStyles.rtlStyle]}>{strings.generateReport}</Text>
          </View>
          <CalendarView
            setSdate={setSdate}
            setEdate={setEdate}
            sdate={sdate}
            edate={edate}
          />

          {/* start date - end date  */}
          <View style={[globalStyles.rowView, { justifyContent: 'center' }]}>
            <View style={styles.vwDate}>
              <Text style={[globalStyles.rtlStyle, styles.txtDate, { color: sdate ? colors.dark_blue1_color : colors.light_gray, }]}>{sdate ? convertDate(sdate) : strings.start_date}</Text>
            </View>
            <View style={{ marginBottom: hp(2), padding: wp(2.5), }}>
              <Text style={styles.txtDate}>-</Text>
            </View>
            <View style={styles.vwDate}>
              <Text style={[globalStyles.rtlStyle, styles.txtDate, { color: edate != ' ' ? colors.dark_blue1_color : colors.light_gray, }]}>{edate != ' ' ? convertDate(edate) : strings.end_date}</Text>
            </View>
          </View>

          <CustomBlackButton
            title={strings.done}
            textStyle={{ marginVertical: wp(1) }}
            buttonStyle={{ ...styles.boxShadowStyle, marginBottom: hp(4) }}
            onPress={() => {
              if (sdate && edate) {
                setIsLoading(true)
                dispatch(generateReport({ from_date: sdate, to_date: edate }))
                dispatch(generatedReportDetails({ from_date: sdate, to_date: edate, reportType: 'detail', page: JobDetailsPage })).unwrap().then(() => {
                  setIsLoading(false)
                  setIsJobDetailsApiCalled(true)
                }).catch(() => {
                  setIsLoading(false)
                  dispatch(resetGeneratedReportDetailsReducer())
                  setIsJobDetailsApiCalled(true)
                })
                dispatch(generatedReportDetails({ from_date: sdate, to_date: edate, reportType: 'sum_up' }))
              }
            }}
          />

          {/* details & summed up tabs */}
          {generatedReportJobDetails?.results?.length != 0 ?
            <>
              <ButtonTab
                btnOneTitle={strings.detailed}
                btnTwoTitle={strings.sammedUp}
                setBtn={setBtn}
                btnValue={btn}
              />
              {btn.open ?
                <>
                  <View style={[globalStyles.rowView, { justifyContent: "space-between", marginVertical: wp(2), marginTop: hp(2) }]}>
                    <View style={[globalStyles.rowView]}>
                      <Image source={ImagesPath.suitcase_icon} style={[styles.iconStyle, { tintColor: colors.dark_blue1_color }]} />
                      <Text style={[styles.JobsTxt, globalStyles.rtlStyle]}>{strings.jobs}</Text>
                    </View>
                    <TouchableOpacity style={[globalStyles.rowView]} onPress={() => { checkPermissionForDownloadFile() }}>
                      <Image source={ImagesPath.download_simple_icon} style={[styles.iconStyle, { tintColor: colors.dark_blue1_color }]} />
                      <Text style={[styles.genrateTxt, globalStyles.rtlStyle]}>{strings.generateReport}</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    scrollEnabled={false}
                    data={generatedReportJobDetails?.results}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={styles.lineSeprator} />}
                  />
                </>
                :
                <View style={[styles.sammedView, { flexShrink: 1 }]}>
                  <FlatList
                    data={generatedReportSumUp}
                    renderItem={renderItem}
                    nestedScrollEnabled
                    scrollEnabled={true}
                    ListHeaderComponent={() => {
                      return (
                        <TableHeaderView type='report' />
                      )
                    }}
                    ItemSeparatorComponent={() => <View style={styles.sammedSepratorLine} />}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              }
            </> :
            <>
              {isJobDetailsApiCalled && <Text style={styles.emptyTextStyle}>{strings.empty_list}</Text>}
            </>
          }
        </ScrollView>
      </Container>
    </View >
  )
}

export default ReportGeneratorScreen
