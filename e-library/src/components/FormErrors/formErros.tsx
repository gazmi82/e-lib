export class FormErrors {
  static errorMessage(
    namesRef: any,
    errors: any,
    touchedFields: any,
    isSubmitted: any,

    invalidMessage = null,
  ) {
    if (invalidMessage) {
      return invalidMessage;
    }

    if (!isSubmitted && !touchedFields[namesRef]) {
      return null;
    }

    const errorMessageDisplayed = errors[namesRef];

    return (
      errorMessageDisplayed?.[0]?.message ||
      errorMessageDisplayed?.message ||
      errorMessageDisplayed ||
      null
    );
  }
}
