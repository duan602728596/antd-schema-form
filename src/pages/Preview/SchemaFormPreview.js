import { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { message, Empty } from 'antd';
import { FrownOutlined as IconFrownOutlined } from '@ant-design/icons';
import SchemaForm from 'antd-schema-form';
import style from './schemaFormPreview.sass';

/* 表单预览生成 */
class SchemaFormPreviewErrorCache extends Component {
  static propTypes = {
    messageApi: PropTypes.object,
    json: PropTypes.object,
    languagePack: PropTypes.object,
    onOk: PropTypes.func
  };

  constructor() {
    super(...arguments);

    this.state = {
      hasError: false,
      json: this.props.json
    };
  }

  static getDerivedStateFromError(err) {
    return { hasError: true };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.json !== prevState.json) {
      return {
        json: nextProps.json,
        hasError: false
      };
    }

    return null;
  }

  componentDidCatch(err, info) {
    this.props.messageApi.error('Schema has error!');
  }

  render() {
    const { hasError, json } = this.state;
    const { languagePack, onOk } = this.props;
    const props = { json, languagePack, onOk };

    if (hasError) {
      return (
        <div className={ style.errData }>
          <Empty description=" " image={ <IconFrownOutlined className={ style.frown } /> } />
        </div>
      );
    } else {
      return <SchemaForm { ...props } />;
    }
  }
}

function SchemaFormPreview(props) {
  const [messageApi, messageContextHolder] = message.useMessage();

  return (
    <Fragment>
      <SchemaFormPreviewErrorCache messageApi={ messageApi } { ...props } />
      { messageContextHolder }
    </Fragment>
  );
}

export default SchemaFormPreview;